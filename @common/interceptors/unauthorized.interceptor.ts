import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { clearLocalStorage } from '@common/services';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if ([401].indexOf(err.status) !== -1) {
          if (!window.location.href.includes('auth/login')) {
            clearLocalStorage();
            document.location.reload();
          }
        }
        return throwError(() => err);
      }),
    );
  }
}
