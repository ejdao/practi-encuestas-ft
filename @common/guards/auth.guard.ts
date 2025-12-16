import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_KEYS } from '../constants';

export const AuthGuard = () => {
  const router = inject(Router);

  if (localStorage.getItem(STORAGE_KEYS.authToken) === null) {
    router.navigate(['auth/login']);
    return false;
  }

  return true;
};
