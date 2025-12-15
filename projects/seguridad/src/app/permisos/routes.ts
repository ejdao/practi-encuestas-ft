import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'web',
    children: [
      {
        path: 'manage',
        loadComponent: () => import('./presentation/pages/manage').then((m) => m.ManageComponent),
      },
    ],
  },
];
