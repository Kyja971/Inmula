import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {  Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  
  const _local = inject(StorageService);

  const token = _local.retrieve('auth');
  //clone la requête originale
  const authReq = req.clone({
    withCredentials: true,
    headers: req.headers.set('authorization', `Bearer ${token}`),
  });
  return next(authReq);
  //.pipe(
  //   catchError((error: HttpErrorResponse) => {
  //     // Gestion des erreurs
  //     console.error('Erreur lors de la requête:', error);
  //     return throwError(() => new Error("Une erreur s'est produite"));
  //   })
  // );
}
