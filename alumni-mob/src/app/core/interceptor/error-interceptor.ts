import { HttpErrorResponse } from '@angular/common/http';
import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { catchError, Observable, throwError } from 'rxjs';

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const _toastController = inject(ToastController)
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
          const toast = _toastController.create({
            message: 'Action refusée',
            duration: 3000,
            position: 'middle',
            buttons: [
                {
                    text: 'Fermer'
                }
            ]
          })
            .then((createdToast) => createdToast.present())
          return throwError(error);
        })
      );

}