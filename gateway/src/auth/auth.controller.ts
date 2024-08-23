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
import { Observable, take } from 'rxjs';
import { TokenType } from './models/token.type';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('login')
  login(@Body() body: AuthBodyType) {
    return this._authService.login(body).pipe(take(1));
  }
}
