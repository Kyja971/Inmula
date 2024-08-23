import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  doLogin(credentials: any): Observable<HttpResponse<any>>{
    if(credentials.login === 'admin' && credentials.password === 'admin'){
      //Return 200 ok status
      return of(new HttpResponse<any>({
        status: 200,
        body: {token: 'a.b.c'}
      }))
    }
    // Return 403 Forbiden status
    return of(new HttpResponse<any>({
      status: 403,
      body: {message: 'Echec de l\'authentification'}
    }))
  }
}
