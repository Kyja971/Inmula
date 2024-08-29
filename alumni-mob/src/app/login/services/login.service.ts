import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

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
        body: {token: '66cda3bee245fecb50452d76.b.c'}
      }))
    } else if (credentials.login === 'gabriel' && credentials.password === 'delaigue') {
      return of(new HttpResponse<any>({
        status: 200,
        body: { token: `${environment.gabrielId}.b.c` }
      }))
    } else if (credentials.login === 'lila' && credentials.password === 'oukaci') {
      return of(new HttpResponse<any>({
        status: 200,
        body: { token: '66cf126a5d032c486f453329.b.c'}
      }))
    } else if(credentials.login === 'rachid' && credentials.password === 'remil') {
      return of(new HttpResponse<any>({
        status: 200,
        body: { token: '66cf12db5d032c486f45332d.b.c'}
      }))
    } else if (credentials.login === 'jacky' && credentials.password === 'hoton') {
      return of(new HttpResponse<any>({
        status: 200,
        body: { token: '66cf12825d032c486f45332b.b.c'}
      }))
    } else if (credentials.login === 'julien' && credentials.password === 'alonzo') {
      return of(new HttpResponse<any>({
        status: 200,
        body: { token: '66cf12fd5d032c486f453330.b.c'}
      }))
    } else {
      if (credentials.login === 'Gabriel' && credentials.password === 'password') {
        return of(new HttpResponse<any>({
          status: 200,
          body: { token: `66cda547ff1d387848b0351a.b.c`}
        }))
      }
      return of(new HttpResponse<any>({
        status: 403,
        body: { message: "Echec de l'authentification" }
      }))
    }
    // // Return 403 Forbiden status
    // return of(new HttpResponse<any>({
    //   status: 403,
    //   body: {message: 'Echec de l\'authentification'}
    // }))
  }
}
