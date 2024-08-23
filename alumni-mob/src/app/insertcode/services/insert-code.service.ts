import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsertCodeService {
  code = Math.floor(Math.random() * 100);

  constructor() {}

  getCode(): number {
    return this.code;
  }

  doValidate(credentials: any): Observable<HttpResponse<any>> {
    if (credentials.code == this.code) {
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
        body: { message: 'Code incorrect' },
      })
    );
  }
}
