/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { AuthBodyType } from "./models/auth-body.type";
import { TokenType } from "./models/token.type";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "./models/account-entity";
import { DeleteResult, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { UpdateAuthDto } from "./utils/dto/update-auth-dto";
import { AuthDto } from "./utils/dto/auth-dto";
import { comparePaswrd, encodePaswrd } from "./utils/bcrytpt";
import { lastValueFrom } from "rxjs";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AccountEntity) private _repository: Repository<AccountEntity>,
    @Inject('INTERN') private _client: ClientProxy,
    private jwt: JwtService
  ) {}

  async add(auth: UpdateAuthDto): Promise<AuthDto> {
    // Sauvegarde de l'entité avec le mot de passe haché
    const newAuth = await this._repository.save(auth);
    return newAuth;
  }

  async delete(id: number): Promise<DeleteResult> {
    return this._repository.delete({ id: id });
  }

  async findAll(): Promise<AccountEntity[] | null> {
    return this._repository.find();
  }
  
  async findOne(id: number): Promise<AccountEntity | null> {
    const auth = await this._repository.findOne({ where: { id } });
    if (!auth) {
      return null;
    }
    return auth;
  }

  async update(authId: number, updateAuthDto: UpdateAuthDto): Promise<AccountEntity> {
    // check si présent dans la bdd
    const existingAuth = await this._repository.findOne({
      where: { id: authId },
    });
    if (!existingAuth) {
      throw new NotFoundException(`Auth #${authId} not found`);
    }

    // Mise à jour des propriétés de l'utilisateur existant
    existingAuth.email = updateAuthDto.email || existingAuth.email;
    if(updateAuthDto.password){
      existingAuth.password = encodePaswrd(updateAuthDto.password) || existingAuth.password;
    }
    existingAuth.role = updateAuthDto.role || existingAuth.role;

    const updatedAccount = await this._repository.save(existingAuth);
    return updatedAccount;
  }

  async login(body: AuthBodyType): Promise<TokenType | null> {
    return (
      this._repository
        .findOne({ where: { email: body.email } })
        .then(async (user) => {
          if (!user) {
            return undefined;
          }
          // Comparer les mots de passe entre bdd et celui saisi
          const pwd = comparePaswrd(body.password, user.password);

          if ((await pwd) == true) {
            // Construire le token
            const payload = {
              id: user.id,
              role: user.role,
              email: user.email,
            };

            return {
              token: await this.jwt.signAsync(payload),
            };
          }
        })
        //uniquement si erreur sql
        .catch((error) => {
          console.log(error);
          return null;
        })
    );
  }

  async getInternId(token: TokenType): Promise<string> {
    let email = this.jwt.decode(token.token).email
    let pattern = { cmd : 'findOneByMail'}
    const author = await lastValueFrom(
      this._client.send<string>(pattern, { email: email }),
    );
    return JSON.stringify(author)
  }

  async checkEmail(payload: any): Promise<{isMailValid: boolean, id: number}> {
    const existingAuth = await this._repository.findOne({
      where: { email: payload.email },
    });
    if (existingAuth && !existingAuth.password){
      return {isMailValid: true, id: existingAuth.id}
    } else {
      return {isMailValid: false, id: null}
    }
  }

  decode(token: string): Promise<any> {
    return this.jwt.verifyAsync(token, {
      secret: process.env.SECRET,
    });
  }
}
