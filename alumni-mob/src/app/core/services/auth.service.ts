import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenType } from '../types/token/token.type';
import { StorageService } from './storage.service';
import { AuthType } from '../types/auth/auth.type';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { SelfInformationService } from './self-information.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URI: string = `${environment.gatewayUrl}/auth`;
  private authsSubject = new BehaviorSubject<AuthType[]>([]);
  public auths$ = this.authsSubject.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _storageService: StorageService,
    private _modalController: ModalController,
    private _selfInformation: SelfInformationService
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
  checkMail(payload: any): Observable<{isMailActivated: boolean, authId: number}>{
    return this._httpClient.post<{isMailActivated: boolean, authId: number}>(`${this.URI}/checkEmail`, payload)
  }

  insertPassword(payload: any): Observable<any> {
    return this._httpClient.patch<any>(`${this.URI}/${this._storageService.retrieve("authId")}`, payload)
  }

  findAll() {
    this._httpClient.get<Array<AuthType>>(this.URI).pipe(take(1)).subscribe((auths: AuthType[]) => {
      this.authsSubject.next(auths);
    })
  }

  findByRole(role: string): AuthType[]{
    return this.authsSubject.value.filter(auth => auth.role == role);
  }

  add(auth : AuthType){
    this._httpClient.post<AuthType>(this.URI, auth).pipe(take(1)).subscribe((auth: AuthType) => {
      this.authsSubject.next([...this.authsSubject.value, auth]);
      this._modalController.dismiss();
    })
  }

  delete(id: number){
    this._httpClient.delete(this.URI + '/' + id).pipe(take(1)).subscribe(() => {
      const updateAuth = this.authsSubject.value.filter(auth => auth.id !== id);
      this.authsSubject.next(updateAuth);
    });
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

  setRole(token: TokenType){
    this._httpClient.post<string>(`${this.URI}/getRole`, token).pipe(take(1)).subscribe((role: string) => {
      this._selfInformation.role = role
    })
  }

  getRole(token: TokenType): Observable<string> {
    return this._httpClient.post<string>(`${this.URI}/getRole`, token).pipe(take(1))
  }
}
