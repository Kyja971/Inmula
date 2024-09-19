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
  if(req.url.includes("francetravail.io")) return next(req);
  //clone la requête originale
  const authReq = req.clone({
    withCredentials: true,
    headers: req.headers.set('authorization', `Bearer ${token}`),
  });
  return next(authReq);

}
