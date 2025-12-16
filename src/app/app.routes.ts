import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
//import { AdminDashboardComponent } from './app.layout-admin';
import { AdminDashboardComponent } from './layouts/admin';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadChildren: () => loadRemoteModule('seguridad', './authMf').then((m) => m.routes),
      },
    ],
  },
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./components/home').then((m) => m.HomeComponent),
      },
      {
        path: 'seguridad',
        loadChildren: () => loadRemoteModule('seguridad', './mf').then((m) => m.routes),
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
