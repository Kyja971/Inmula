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
        body: { token: `${environment.lilaId}.b.c`}
      }))
    } else if(credentials.login === 'rachid' && credentials.password === 'remil') {
      return of(new HttpResponse<any>({
        status: 200,
        body: { token: `${environment.rachidId}.b.c`}
      }))
    } else if (credentials.login === 'jacky' && credentials.password === 'hoton') {
      return of(new HttpResponse<any>({
        status: 200,
        body: { token: `${environment.jackyId}.b.c`}
      }))
    } else if (credentials.login === 'julien' && credentials.password === 'alonzo') {
      return of(new HttpResponse<any>({
        status: 200,
        body: { token: `${environment.julienId}.b.c`}
      }))
    } else {
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
