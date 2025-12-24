import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { AdminDashboardComponent } from './layouts/admin';
import { AuthGuard, GuestGuard } from '@common/guards';
import { GEN_AUTHORITIES } from '@authorities/general';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'auth',
    canActivate: [GuestGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('@seguridad/auth/routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./components/home').then((m) => m.HomeComponent),
      },
      {
        path: 'seguridad',
        loadChildren: () => loadRemoteModule('seguridad', './mf').then((m) => m.routes),
        data: { title: 'Seguridad', authorities: [GEN_AUTHORITIES.CODE] },
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
