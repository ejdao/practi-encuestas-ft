import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ADMIN_AUTHORITY } from '@authorities/principal';
import { environment } from '@environments/environment';
import { SessionStore } from '@stores/session';

const _validateAuthorities = (
  authorities: string[] | undefined,
  myAuthorities: string[],
): boolean => {
  if (authorities) {
    let canActivate = false;

    authorities.map((authority) => {
      if (myAuthorities.indexOf(authority) >= 0) canActivate = true;
    });

    return canActivate;
  } else {
    return true;
  }
};

export const AuthoritiesGuard = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const sessionStore = inject(SessionStore);
  const myAuthorities: string[] = [];

  if (environment.production) {
    const fetchAuthorities = sessionStore.observable().subscribe((session) => {
      if (session.wasLoaded) myAuthorities.push(...session.authorities);
    });
    fetchAuthorities.unsubscribe();
  } else {
    myAuthorities.push(ADMIN_AUTHORITY);
  }

  const requiredAuthorities = route.data!['authorities']
    ? [ADMIN_AUTHORITY, ...route.data['authorities']]
    : undefined;

  const canActivate = _validateAuthorities(requiredAuthorities, myAuthorities);

  if (!canActivate) router.navigate(['']);
  return canActivate;
};
