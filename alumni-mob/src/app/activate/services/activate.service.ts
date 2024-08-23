import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivateService {

  constructor() { }

  _dataBase = [
    {
      email: "julien.alonzo@poe.aelion.fr",
      password: 'password'
    },
    {
      email: 'jacky.hoton@poe.aelion.fr',
      password: 'password'
    },
    {
      email: 'louis-gabriel.delaigue@poe.aelion.fr',
      password: 'password'
    },
    {
      email: 'rachid.remin@poe.aelion.fr',
      password: 'password'
    }
  ]

  mails= ['julien.alonzo@poe.aelion.fr', 'jacky.hoton@poe.aelion.fr', 'test']

  doActivate(credentials:any): Observable<HttpResponse<any>> {
    if (this.mails.find((mail: string) => credentials.email == mail)){
      // ici retourner un 200 ok 
      return of(
        new HttpResponse  <any> ({
          status: 200,
          //body: {token: 'a.b.c'}
        })
      )
    }
    // retourner une réponse 403 forbiden
    return of(
      new HttpResponse <any> ({
        status: 403,
        body: {message: 'Email inconnu'}
        
      })
    )
  }
}
