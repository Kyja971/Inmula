/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBodyType } from './models/auth-body.type';
import { Observable, take, tap } from 'rxjs';
import { TokenType } from './models/token.type';
import { AuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: AuthBodyType,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      const token = await this._authService.login(body).pipe(
        tap((token) => {
          res.cookie('jwt', token.token, { httpOnly: true, domain: 'localhost:8100' });
          console.log('token', token.token);
        }),
      );

      return token;
    } catch (error) {
      console.error('Login error:', error);
      return { error: 'Login failed' };
    }
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() auth: AuthDto): Observable<AuthDto> {
    return this._authService.update(id, auth).pipe(
      take(1), // autre facon d'arrêter d'observer
    );
  }

  @Post()
  add(@Body() auth: UpdateAuthDto): Observable<AuthDto> {
    return this._authService.add(auth).pipe(take(1));
  }

  @Get()
  findAll(): Observable<AuthDto[]> {
    return this._authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<AuthDto> {
    return this._authService.findOne(id).pipe(take(1));
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<AuthDto> {
    return this._authService.delete(id);
  }
}
