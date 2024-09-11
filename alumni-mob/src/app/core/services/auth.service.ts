import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenType } from '../types/token/token.type';
import { StorageService } from './storage.service';
import { AuthType } from '../types/auth/auth.type';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { plainToInstance } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URI: string = `http://localhost:3000/auth`;
  private authsSubject = new BehaviorSubject<AuthType[]>([]);
  public auths$ = this.authsSubject.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _storageService: StorageService,
    private _modalController: ModalController
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

  findAll() {
    this._httpClient.get<Array<AuthType>>(this.URI).pipe(take(1)).subscribe((auths: AuthType[]) => {
      this.authsSubject.next(auths);
    })
  }

  add(auth : AuthType){
    this._httpClient.post<AuthType>(this.URI, auth).pipe(take(1)).subscribe((auth: AuthType) => {
      this.authsSubject.next([...this.authsSubject.value, auth]);
      this._modalController.dismiss();
    })
  }

  delete(id: number){
    this._httpClient.delete(this.URI + '/' + id).pipe(take(1)).subscribe();
    const updateAuth = this.authsSubject.value.filter(auth => auth.id !== id);
    this.authsSubject.next(updateAuth);
  }

  update(id?: number, payload?: AuthType) {
    this._httpClient.patch<AuthType>(this.URI + '/' + id, payload).pipe(take(1)).subscribe((auth: AuthType) => {
      const newAuths = this.authsSubject.value;
      newAuths.map(authSubject => { 
        if(authSubject.id === id){
          authSubject.email = auth.email;
          authSubject.role = auth.role;
        }
      })
      this.authsSubject.next([...newAuths]);
      this._modalController.dismiss();
    }); 
  }
}
