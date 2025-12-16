import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { ADMIN_AUTHORITY } from '@authorities/principal';
import { environment } from '@environments/environment';
import { SessionStore } from '@stores/session';

@Injectable({ providedIn: 'root' })
export class CustomPreloadingStrategy implements PreloadingStrategy {
  constructor(private _sessionStore: SessionStore) {}

  preload(route: Route, load: () => Observable<any>) {
    if (environment.production) {
      let authorities!: string[];

      const subscription = this._sessionStore.observable().subscribe((session) => {
        if (session.wasLoaded) authorities = session.authorities;
      });

      setTimeout(() => {
        subscription.unsubscribe();
      }, 30000);

      if (!authorities) authorities = [];

      if (route.data && route.data['authorities']) {
        const authoritiesRequired = [ADMIN_AUTHORITY, ...(route.data['authorities'] as string[])];

        const hasAuthority = () =>
          authoritiesRequired.some((authority: string) => authorities.includes(authority));

        if (hasAuthority()) return load();
        else return of(null);
      } else return of(null);
    } else return load();
  }
}
