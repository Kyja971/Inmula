/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Inject, Param } from "@nestjs/common";
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

/**
 * This service will take care about everything concerning the authentication
 */
@Injectable()
export class AppService {

  /**
   * Dependence injections
   * @param _repository database repository
   * @param _client client proxy to communicate with the intern microservice
   * @param jwt the jwt service that create a jwt token
   */
  constructor(
    @InjectRepository(AccountEntity) private _repository: Repository<AccountEntity>,
    @Inject('INTERN') private _client: ClientProxy,
    private jwt: JwtService
  ) { }

  async add(auth: UpdateAuthDto): Promise<AuthDto> {
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
    // Check if the auth is present in the database
    const existingAuth = await this._repository.findOne({
      where: { id: authId },
    });
    if (!existingAuth) {
      throw new NotFoundException(`Auth #${authId} not found`);
    }

    // Update datas of the existing user
    existingAuth.email = updateAuthDto.email || existingAuth.email;
    if (updateAuthDto.password) {
      existingAuth.password = encodePaswrd(updateAuthDto.password) || existingAuth.password;
    }
    existingAuth.role = updateAuthDto.role || existingAuth.role;

    const updatedAccount = await this._repository.save(existingAuth);
    return updatedAccount;
  }

/**
 * Create and return a TokenType if the user logged correctly
 * @param AuthBodyType A body containing the entered credentials
 * @returns TokenType 
 */
  async login(body: AuthBodyType): Promise<TokenType | null> {
    // Check if the mail is present in the database
    return this._repository.findOne({ where: { email: body.email } })
      .then(async (user) => {
        // Compare the entered password to the database one
        const pwd = await comparePaswrd(body.password, user.password);

        if (pwd) {
          // If both passwords are the same then we can build the payload 
          const payload = {
            id: user.id,
            role: user.role,
            email: user.email,
          };

          // Then we build and return a jwt token from the payload
          return {
            token: await this.jwt.signAsync(payload),
          };
        }
      })
      // Catch and return a possible sql error
      .catch((error) => {
        console.log(error);
        return null;
      })
  }

  /**
   * Get the internId from the token
   * @param token 
   * @returns 
   */
  async getInternId(token: TokenType): Promise<string> {
    // Decode the token in order to retrieve the initial payload
    return this.decode(token).then(async (payload: any) => {
      // Asks the internId to the Intern microservice by the mail associate to the token
      let pattern = { cmd: 'findOneByMail' };
      const author = await lastValueFrom(this._client.send<string>(pattern, { email: payload.email }));
      return JSON.stringify(author);
    })
  }

  /**
   * Check if the mail is activated
   * @param payload contains the email we wants to check
   * @returns payload : { isMailActivated : boolean, authId : number }  a payload containing a boolean to know if the mail is activated
   * and the authId associate to this email
   */
  async checkEmail(payload: any): Promise<{ isMailActivated: boolean, authId: number }> {
    //Get the auth related to the mail
    const existingAuth = await this._repository.findOne({
      where: { email: payload.email },
    });
    //If the auth exist and if it has no password then we return false and the id of the auth
    //We need the id in order to add the password at the end of the activation process
    if (existingAuth && !existingAuth.password) {
      return { isMailActivated: false, authId: existingAuth.id }
    } else {
      return { isMailActivated: true, authId: null }
    }
  }

  /**
   * Decode the token
   * @param token 
   * @returns the initial payload use to create the token
   */
  decode(token: TokenType): Promise<any> {
    return this.jwt.verifyAsync(token.token, {
      secret: process.env.SECRET,
    });
  }

  /**
   * Get the role associate to the token
   * @param token 
   * @returns 
   */
  getRole(token: TokenType): Promise<string> {
    // Decode the token to gets the initial payload and return the role
    return this.decode(token).then((payload: any) => {
      return JSON.stringify(payload.role)
    })
  }
}
