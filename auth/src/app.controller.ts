/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthBodyType } from './models/auth-body.type';
import { TokenType } from './models/token.type';

@Controller()
export class AppController {
  constructor(private _appService: AppService) {}

  @MessagePattern({ message: 'login' })
  async login(body: AuthBodyType): Promise<TokenType | null> {
    return await this._appService.login(body);
  }
}
