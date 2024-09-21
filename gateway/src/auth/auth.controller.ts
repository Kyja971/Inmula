/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Collection of endpoints for Authentication
 * Creation of unactivated accounts
 * Management of accounts (modification, deletion and activation)
 * Some endpoints are designed to retrieve specific informations about logged user.
 * Purpose of those specific informations are for logical uses in further code.
 */
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
import { FirstConnexionGuard } from './guards/first-connexion.guard';

@Controller('auth')
export class AuthController {
  
  constructor(private _authService: AuthService) {}

  /**
   * Add an account
   * Protected by Admin or SAdmin Guard
   * Only superiors acces are allowed to create new unactivated accounts
   * 
   * @param req with implemented user property from decoded token
   * @param newAccount Protection of superiors rights during new account creation
   * @returns 
   */
  @UseGuards(AdminOrSuperAdminGuard)
  @Post()
  add(@Req() req: Request, @Body() newAccount: UpdateAuthDto): Observable<AuthDto> {
    if(req['user'].role == 'admin' && (newAccount.role == 'admin' || newAccount.role == 'super_admin')){
      throw new UnauthorizedException("Vous n'avez pas les droits pour attribuer ce role");
    } else return this._authService.add(newAccount).pipe(take(1));
  }

  /**
   * Modification of new account informations
   * TODO allow modification of owner account
   * 
   * @param req 
   * @param id Retrieve owner
   * @param body contains informations you want to change
   * @returns 
   */
  @UseGuards(AdminOrSuperAdminGuard)
  @Patch(':id')
  update(@Req() req: Request, @Param('id') id: number, @Body() body: UpdateAuthDto): Observable<AuthDto> {
    this.findOne(id).pipe(take(1)).subscribe((accountToUpdate: AuthDto) => {
      if (req['user'].role == 'admin' && (accountToUpdate.role == 'admin' || accountToUpdate.role == 'super_admin')) {
        throw new UnauthorizedException("Vous n'avez pas les droits pour modifier cet utilisateur");
      }
    })
    //Check if an admin tries to modify the role of an auth to admin or super admin
    if(req['user'].role == 'admin' && (body.role == 'admin' || body.role == 'super_admin')){
      throw new UnauthorizedException("Vous n'avez pas les droits pour attribuer ce role");
    } else return this._authService.update(id, body).pipe(take(1));
  }

  @UseGuards(FirstConnexionGuard)
  @Patch('activation/setPassword')
  setPassword(@Body() body: UpdateAuthDto): Observable<AuthDto> {
    return this._authService.setPassword(body)
  }

  /**
   * 
   * @returns all accounts
   */
  @Get()
  @UseGuards(AdminOrSuperAdminGuard)
  findAll(): Observable<AuthDto[]> {
    return this._authService.findAll();
  }

  /**
   * 
   * @param id use to find a specific id
   * @returns an account
   */
  @UseGuards(AdminOrSuperAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Observable<AuthDto> {
    return this._authService.findOne(id).pipe(take(1));
  }

  //Delete a specify account(targeted by id)
  //protected deletion by superior rights 
  @UseGuards(AdminOrSuperAdminGuard)
  @Delete(':id')
  delete(@Req() req: Request, @Param('id') id: number): Observable<AuthDto> {
    //The switchMap is used to transform an observable to another
    return this.findOne(id).pipe(take(1), switchMap((auth: AuthDto) => {
        if (req['user'].role == 'admin' && (auth.role == 'admin' || auth.role == 'super_admin')) {
          throw new UnauthorizedException("Vous n'avez pas les droits pour supprimer cet utilisateur");
        } else {
          return this._authService.delete(id);
        }
      })
    );
  }

  //Create a cookie filled with a token on login
  //option object @res decorator => makes .cookie() method available
  //be aware that response is express's response type 
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
  async checkEmail(@Body() body: any, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const payload = await this._authService.checkEmail(body).pipe(
        tap(() => {
          res.cookie('email', body.email, { httpOnly: true, domain: 'localhost', sameSite:'lax' })
        }))
        return payload
    }
    catch (error) {
      error: 'mail not valid'
    }
  }

  //Returns the id of the user from the token (by checking the email)
  @Post('internId')
  async getInternId(@Body() token: TokenType): Promise<Observable<string>> {
    return await this._authService.getInternId(token);
  }

  //Decode the token and return the initial payload
  @Post('decode')
  async decodeToken(@Body() token: TokenType): Promise<Observable<any>> {
    return await this._authService.decodeToken(token)
  }

  //return the user's role (from the decoded token)
  @Post('getRole')
  async getRole(@Body() token: TokenType): Promise<Observable<string>> {
    return await this._authService.getRole(token)
  }

}
