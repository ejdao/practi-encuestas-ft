import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app/routes').then((m) => m.routes),
  },
];
