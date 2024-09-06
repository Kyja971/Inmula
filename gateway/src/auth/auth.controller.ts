/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBodyType } from './models/auth-body.type';
import { Observable, take, tap } from 'rxjs';
import { TokenType } from './models/token.type';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthBodyType) {
    const login = await this._authService.login(body).pipe(
      tap((x) => console.log(x)),
      take(1),
    );
    console.log(login);
    return login;
  }
}
