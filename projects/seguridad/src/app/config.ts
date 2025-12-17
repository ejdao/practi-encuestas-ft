import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ROOT_REDUCERS } from '@stores/state';
import { provideStore } from '@ngrx/store';
import { routes } from './routes';

export const appConfig: ApplicationConfig = {
  providers: [provideStore(ROOT_REDUCERS), provideRouter(routes)],
};
