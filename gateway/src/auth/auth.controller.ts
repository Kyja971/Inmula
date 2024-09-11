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
  UseGuards,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBodyType } from './models/auth-body.type';
import { Observable, take, tap } from 'rxjs';
import { TokenType } from './models/token.type';
import { AuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AdminOrSuperAdminGuard } from './guards/admin-super-admin.guard';
import { Request } from 'express'

@Controller('auth')
export class AuthController {
  
  constructor(private _authService: AuthService) {}

  //Add an account
  @UseGuards(SuperAdminGuard)
  @Post()
  add(@Body() auth: UpdateAuthDto): Observable<AuthDto> {
    return this._authService.add(auth).pipe(take(1));
  }

  //Update an account
  @Patch(':id')
  update(@Param('id') id: number, @Body() auth: UpdateAuthDto): Observable<AuthDto> {
    return this._authService.update(id, auth).pipe(
      take(1), // autre facon d'arrêter d'observer
    );
  }

  //Get all account
  @Get()
  findAll(): Observable<AuthDto[]> {
    return this._authService.findAll();
  }

  //Get one account
  @Get(':id')
  findOne(@Param('id') id: number): Observable<AuthDto> {
    return this._authService.findOne(id).pipe(take(1));
  }

  //Delete an account
  @Delete(':id')
  delete(@Param('id') id: number): Observable<AuthDto> {
    return this._authService.delete(id);
  }

  //Create a token when logged, and insert it in a cookie
  @Post('login')
  async login(@Body() body: AuthBodyType, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const token = await this._authService.login(body).pipe(
        tap((token) => {
          res.cookie('jwt', token.token, { httpOnly: true, domain: 'localhost', sameSite:'lax' });
        }),
      );

      return token;
    } catch (error) {
      console.error('Login error:', error);
      return { 
        error: 'Login failed' 
      };
    }
  }

  //Check if the mail is valid when an user wants to activate an account
  //A mail is valid if the mail is present in the database and if it has no password
  @Post('checkEmail')
  async checkEmail(@Body() payload: any): Promise<Observable<{isMailValid: boolean, id: number}>> {
    return await this._authService.checkEmail(payload);
  }

  //Returns the id of the users from the token (by checking the email)
  @Post('internId')
  async getInternId(@Body() token: TokenType): Promise<Observable<string>> {
    return await this._authService.getInternId(token);
  }
}
