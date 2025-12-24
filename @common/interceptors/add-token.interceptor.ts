import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { STORAGE_KEYS } from '@common/constants';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(STORAGE_KEYS.authToken);

    const headers: any = { Accept: 'Application/json' };

    if (token) headers.Authorization = `Bearer ${token}`;

    const httpHeaders = new HttpHeaders(headers);

    const authReq = req.clone({
      headers: httpHeaders,
    });
    return next.handle(authReq);
  }
}
