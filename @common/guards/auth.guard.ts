import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOGIN_ROUTE, STORAGE_KEYS } from '../constants';

export const AuthGuard = () => {
  const router = inject(Router);

  if (localStorage.getItem(STORAGE_KEYS.authToken) === null) {
    router.navigate([LOGIN_ROUTE]);
    return false;
  }

  return true;
};
