import { Routes } from '@angular/router';
import { GEN_AUTHORITIES } from '@authorities/general';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: () => import('./presentation/pages/list').then((m) => m.Page),
        data: {
          title: 'Lista',
          authorities: [GEN_AUTHORITIES.SEGURIDAD.REGISTRAR_ACTUALIZAR_USUARIOS],
        },
      },
      {
        path: 'manage',
        loadComponent: () => import('./presentation/pages/manage').then((m) => m.Page),
        data: {
          title: 'Gestionar',
          authorities: [GEN_AUTHORITIES.SEGURIDAD.REGISTRAR_ACTUALIZAR_USUARIOS],
        },
      },
    ],
  },
];
