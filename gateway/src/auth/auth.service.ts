import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthBodyType } from './models/auth-body.type';
import { Observable } from 'rxjs';
import { TokenType } from './models/token.type';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH') private _client: ClientProxy) {}

  login(body: AuthBodyType): Observable<TokenType | null> {
    const pattern: any = { message: 'login' };
    return this._client.send<TokenType | null>(pattern, body);
  }
}
