/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Res } from "@nestjs/common";
import { AuthBodyType } from "./models/auth-body.type";
import { TokenType } from "./models/token.type";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "./models/account-entity";
import { DeleteResult, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { UpdateAuthDto } from "./utils/dto/update-auth-dto";
import { AuthDto } from "./utils/dto/auth-dto";
import { Payload } from "@nestjs/microservices";
import { comparePaswrd, encodePaswrd } from "./utils/bcrytpt";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AccountEntity)
    private _repository: Repository<AccountEntity>,
    private jwt: JwtService
  ) {}

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
          
          if (await pwd == true) {
            // Construire le token
            const payload = {
              id: user.id,
              role: user.role,
              email: user.email,
            };

            return {
              token: await this.jwt.signAsync(payload),
            };
          } else {
            console.log("Erreur de pwd")
          }
        })
        //uniquement si erreur sql
        .catch((error) => {
          console.log(error);
          return null;
        })
    );
  }

  async findOne(id: number): Promise<AccountEntity | null> {
    const auth = await this._repository.findOne({ where: { id } });
    if (!auth) {
      return null;
    }
    return auth;
  }

  async findAll(): Promise<AccountEntity[] | null> {
    return this._repository.find();
  }

  async update(
    authId: number,
    updateAuthDto: UpdateAuthDto
  ): Promise<AccountEntity> {
    // check si présent dans la bdd
    const existingAuth = await this._repository.findOne({
      where: { id: authId },
    });
    if (!existingAuth) {
      throw new NotFoundException(`Auth #${authId} not found`);
    }

    // Mise à jour des propriétés de l'utilisateur existant
    existingAuth.email = updateAuthDto.email;
    existingAuth.password = encodePaswrd(updateAuthDto.password);
    existingAuth.role = updateAuthDto.role;

    const updatedAccount = await this._repository.save(existingAuth);
    return updatedAccount;
  }

  async add(auth: UpdateAuthDto): Promise<AuthDto> {

    // Sauvegarde de l'entité avec le mot de passe haché
    const newAuth = await this._repository.save(auth);

    return newAuth;
  }

  async delete(id: number): Promise<DeleteResult> {
    return this._repository.delete({ id: id });
  }
}
