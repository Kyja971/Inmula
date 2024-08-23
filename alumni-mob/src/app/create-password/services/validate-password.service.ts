import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatePasswordService {

  constructor() { }

  doValidate(credentials: any): Observable<HttpResponse<any>> {
    if (credentials.password1 == credentials.password2) {
      // ici retourner un 200 ok
      return of(
        new HttpResponse<any>({
          status: 200,
          //body: {token: 'a.b.c'}
        })
      );
    }
    // retourner une réponse 403 forbiden
    return of(
      new HttpResponse<any>({
        status: 403,
        body: { message: 'Les mots de passes ne sont pas identiques' },
      })
    );
  }
}
