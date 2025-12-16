import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ROOT_REDUCERS } from '@stores/state';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import {
  AddTokenInterceptor,
  TimerInterceptor,
  UnauthorizedInterceptor,
} from '@common/interceptors';
import { CustomPreloadingStrategy } from './app.preloading.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(ROOT_REDUCERS),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withPreloading(CustomPreloadingStrategy),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimerInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
};
