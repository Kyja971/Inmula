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
import { Observable, of, switchMap, take, tap } from 'rxjs';
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
  @UseGuards(AdminOrSuperAdminGuard)
  @Post()
  add(@Req() req: Request, @Body() auth: UpdateAuthDto): Observable<AuthDto> {
    //Check if an admin tries to add an auth with admin or super admin role
    //Only a super admin is allow to
    if(req['user'].role == 'admin' && (auth.role == 'admin' || auth.role == 'super_admin')){
      throw new UnauthorizedException("Vous n'avez pas les droits pour attribuer ce role");
    } else return this._authService.add(auth).pipe(take(1));
  }

  //Update an account
  @UseGuards(AdminOrSuperAdminGuard)
  @Patch(':id')
  update(@Req() req: Request, @Param('id') id: number, @Body() auth: UpdateAuthDto): Observable<AuthDto> {
    //Check if an admin tries to modify an admin or a super admin
    this.findOne(id).pipe(take(1)).subscribe((authSub: AuthDto) => {
      if (req['user'].role == 'admin' && (authSub.role == 'admin' || authSub.role == 'super_admin')) {
        throw new UnauthorizedException("Vous n'avez pas les droits pour modifier cet utilisateur");
      }
    })

    //Check if an admin tries to modify the role of an auth to admin or super admin
    if(req['user'].role == 'admin' && (auth.role == 'admin' || auth.role == 'super_admin')){
      throw new UnauthorizedException("Vous n'avez pas les droits pour attribuer ce role");
    } else return this._authService.update(id, auth).pipe(take(1));
  }

  //Get all account
  @Get()
  @UseGuards(AdminOrSuperAdminGuard)
  findAll(): Observable<AuthDto[]> {
    return this._authService.findAll();
  }

  //Get one account
  @UseGuards(AdminOrSuperAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Observable<AuthDto> {
    return this._authService.findOne(id).pipe(take(1));
  }

  //Delete an account
  @UseGuards(AdminOrSuperAdminGuard)
  @Delete(':id')
  delete(@Req() req: Request, @Param('id') id: number): Observable<AuthDto> {
    //Check if an admin is trying to delete an admin or a super admin
    //We only have the id of the auth, so we need to find the auth
    //And then we can check the role. The switchMap is use to transform an observable to another
    return this.findOne(id).pipe(take(1), switchMap((auth: AuthDto) => {
        if (req['user'].role == 'admin' && (auth.role == 'admin' || auth.role == 'super_admin')) {
          throw new UnauthorizedException("Vous n'avez pas les droits pour supprimer cet utilisateur");
        } else {
          return this._authService.delete(id);
        }
      })
    );
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

  //Decode the token and return the initial payload
  @Post('decode')
  async decodeToken(@Body() token: TokenType): Promise<Observable<any>> {
    return await this._authService.decodeToken(token)
  }

  @Post('getRole')
  async getRole(@Body() token: TokenType): Promise<Observable<string>> {
    return await this._authService.getRole(token)
  }

}
