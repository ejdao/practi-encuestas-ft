import { Routes } from '@angular/router';
import { GEN_AUTHORITIES } from '@authorities/general';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/routes').then((m) => m.routes),
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/routes').then((m) => m.routes),
    data: { title: 'Permisos', authorities: [GEN_AUTHORITIES.SEGURIDAD.CODE] },
  },
  {
    path: 'permisos',
    loadChildren: () => import('./permisos/routes').then((m) => m.routes),
    data: { title: 'Permisos', authorities: [GEN_AUTHORITIES.SEGURIDAD.CODE] },
  },
];
