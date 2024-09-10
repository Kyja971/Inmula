import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { TokenType } from 'src/app/core/types/token/token.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly URI: string = `http://localhost:3000/auth`;

  constructor(private _httpClient: HttpClient) {}

  login(payload: any): Observable<TokenType> {
    return this._httpClient
      .post<TokenType>(this.URI + '/login', {
        email: payload.email,
        password: payload.password,
      })
      .pipe(take(1));
  }

  getInternId(token: TokenType): Observable<string> {
    return this._httpClient
      .post<string>(this.URI + '/internId', token).pipe(take(1))
  }
}
