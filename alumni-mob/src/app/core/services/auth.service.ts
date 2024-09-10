import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { TokenType } from '../types/token/token.type';
import { StorageService } from './storage.service';
import { AuthType } from '../types/auth/auth.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URI: string = `http://localhost:3000/auth`

  constructor(
    private _httpClient: HttpClient,
    private _storageService: StorageService
  ) { }

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
      .post<string>(`${this.URI}/internId`, token).pipe(take(1))
  }

  //Returns an observable of a boolean, which is true if the mail is present 
  //on the auth database, and if no password are assigned to it
  checkMail(payload: any): Observable<{isMailValid: boolean, id: number}>{
    return this._httpClient.post<{isMailValid: boolean, id: number}>(`${this.URI}/checkEmail`, payload)
  }

  insertPassword(payload: any): Observable<any> {
    return this._httpClient.patch<any>(`${this.URI}/${this._storageService.retrieve("authId")}`, payload)
  }

  findAll() : Observable<Array<AuthType>> {
    return this._httpClient.get<Array<AuthType>>(this.URI)
  }

  add(auth : AuthType): Observable<AuthType>{
    return this._httpClient.post<AuthType>(this.URI, auth)
  }
}
