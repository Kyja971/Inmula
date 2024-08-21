import { HttpResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  doLogin(credentials:any): Observable<HttpResponse<any>> {
    if (credentials.login === 'admin' && credentials.password === 'admin'){
      // ici retourner un 200 ok 
      return of(
        new HttpResponse  <any> ({
          status: 200,
          body: {token: 'a.b.c'}
        })
      )
    }
    // retourner une réponse 403 forbiden
    return of(
      new HttpResponse <any> ({
        status: 403,
        body: {message: 'Echec de l\'identification'}
        
      })
    )
  }
}
