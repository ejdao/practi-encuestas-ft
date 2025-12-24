import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./presentation/pages/login').then((m) => m.LoginComponent),
      },
    ],
  },
];
