/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { AuthBodyType } from "./models/auth-body.type";
import { TokenType } from "./models/token.type";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "./models/account-entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AccountEntity)
    private _repository: Repository<AccountEntity>,
    private jwt: JwtService
  ) {}

  async login(body: AuthBodyType): Promise<TokenType | null> {
    console.log("début méthode")
    return this._repository
      .findOne({ where: { email: body.email } })
      .then(async (user) => {
        if (!user) {
          console.log("not user found")
          return undefined;
        }
        if (user.password === body.password) {
          //build token
          console.log(" user found", user)
          const payload = {
            id: user.id,
            role: user.role,
            email: user.email,
          };
          return  {
            token:  await this.jwt.signAsync(payload),
          }
        }
      })
      //uniquement si erreur sql
      .catch((error) => {
        console.log(error);
        return null;
      });


  }
}
