/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthBodyType } from './models/auth-body.type';
import { Observable } from 'rxjs';
import { TokenType } from './models/token.type';

import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH') private _client: ClientProxy) {}

  login(body: AuthBodyType): Observable<TokenType | null> {
    const pattern: any = { message: 'login' };
    return this._client.send<TokenType | null>(pattern, body);
  }

  getInternId(token: TokenType): Observable<string> {
    const pattern: any = { message: 'getIdByEmail' };
    return this._client.send<string>(pattern, token);
  }

  update(id: number, auth: UpdateAuthDto): Observable<AuthDto> {
    const pattern: any = { message: 'update' };
    const payload: any = { id: id, auth: auth };
    return this._client.send<AuthDto, any>(pattern, payload);
  }

  findAll(): Observable<Array<AuthDto>> {
    const pattern: any = { message: 'findAll' };
    return this._client.send<AuthDto[], any>(pattern, {});
  }

  findOne(id: number): Observable<AuthDto> {
    const pattern: any = { message: 'findOne' };
    return this._client.send<AuthDto | null>(pattern, id);
  }

  add(auth: UpdateAuthDto): Observable<AuthDto> {
    const pattern: any = { message: 'addAuth' };
    return this._client.send<AuthDto>(pattern, auth);
  }

  delete(id: number): Observable<AuthDto | null> {
    const pattern: any = { message: 'delete' };
    return this._client.send<AuthDto | null, any>(pattern, id);
  }

  decodeToken(token: string): Observable<any> {
    const pattern: any = { message: 'decode' };
    return this._client.send<TokenType>(pattern, token);
  }

  checkEmail(payload: any): Observable<{isMailValid: boolean, id: number}> {
    const pattern: any = { message: 'checkEmail' };
    return this._client.send<{isMailValid: boolean, id: number}>(pattern, payload);
  }
}
