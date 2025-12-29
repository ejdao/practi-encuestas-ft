import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CustomPreloadingStrategy } from './app.preloading.strategy';
import { provideNativeDateAdapter } from '@toshida/material/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ROOT_REDUCERS } from '@stores/state';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import {
  AddTokenInterceptor,
  TimerInterceptor,
  UnauthorizedInterceptor,
} from '@common/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(ROOT_REDUCERS),
    provideBrowserGlobalErrorListeners(),
    provideIonicAngular({ mode: 'ios' }),
    provideZonelessChangeDetection(),
    provideNativeDateAdapter(),
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
