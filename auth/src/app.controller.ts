/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import { AuthBodyType } from "./models/auth-body.type";
import { TokenType } from "./models/token.type";
import { AccountEntity } from "./models/account-entity";
import { AuthDto } from "./utils/dto/auth-dto";
import { UpdateAuthDto } from "./utils/dto/update-auth-dto";
import { DeleteResult } from "typeorm";

@Controller()
export class AppController {
  constructor(private _appService: AppService) {}

  @MessagePattern({ message: "login" })
  async login(body: AuthBodyType , ): Promise<TokenType | null> {
    return await this._appService.login(body);
  }

  @MessagePattern({ message: "findOne" })
  async findOne(id: number): Promise<AuthDto> {
    return await this._appService.findOne(id);
  }

  @MessagePattern({ message: "findAll" })
  async findAll(): Promise<AuthDto[]> {
    return await this._appService.findAll();
  }

  @MessagePattern({ message: "update" })
  update(payload: any): Promise<AuthDto> {
    return this._appService.update(payload.id, payload.auth);
  }

  @MessagePattern({ message: "addAuth" })
  add(auth: AuthDto): Promise<AuthDto> {
    return this._appService.add(auth);
  }

  @MessagePattern({ message: "delete" })
  delete(id: number): Promise<DeleteResult> {
    return this._appService.delete(id);
  }
}
