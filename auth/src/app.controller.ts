/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthDto } from "./utils/dto/auth-dto";
import { DeleteResult } from "typeorm";
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthBodyType } from './models/auth-body.type';
import { TokenType } from './models/token.type';

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

  @MessagePattern({ message: 'getIdByEmail' })
  async getInternId(token: TokenType): Promise<string | null> {
    return await this._appService.getInternId(token);
  }

  @MessagePattern({ message: "decode" })
  decode(token: string): Promise<any> {
    return this._appService.decode(token);
  }
}
