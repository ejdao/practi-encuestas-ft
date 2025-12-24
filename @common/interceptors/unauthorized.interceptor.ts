import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { clearLocalStorage } from '@common/services';
import { Router } from '@angular/router';
import { LOGIN_ROUTE } from '@common/constants';
import { SessionStore } from '@stores/session';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const router = inject(Router);
    const session = inject(SessionStore);

    return next.handle(req).pipe(
      catchError((err) => {
        if ([401].indexOf(err.status) !== -1) {
          if (!window.location.href.includes(LOGIN_ROUTE)) {
            clearLocalStorage();
            session.clear();
            router.navigate([LOGIN_ROUTE]);
          }
        }
        return throwError(() => err);
      }),
    );
  }
}
