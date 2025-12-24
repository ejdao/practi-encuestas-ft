import { Routes } from '@angular/router';
import { GEN_AUTHORITIES } from '@authorities/general';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        loadComponent: () => import('./presentation/pages/create').then((m) => m.Page),
        data: {
          title: 'Gestionar por usuario',
          authorities: [GEN_AUTHORITIES.SEGURIDAD.CREAR_PERMISOS],
        },
      },
      {
        path: 'manage-by-usuario',
        loadComponent: () => import('./presentation/pages/manage-by-usuario').then((m) => m.Page),
        data: {
          title: 'Gestionar por usuario',
          authorities: [GEN_AUTHORITIES.SEGURIDAD.GESTIONAR_PERMISOS_USUARIO_ROL],
        },
      },
      {
        path: 'manage-by-rol',
        loadComponent: () => import('./presentation/pages/manage-by-rol').then((m) => m.Page),
        data: {
          title: 'Gestionar por rol',
          authorities: [GEN_AUTHORITIES.SEGURIDAD.GESTIONAR_PERMISOS_USUARIO_ROL],
        },
      },
    ],
  },
];
