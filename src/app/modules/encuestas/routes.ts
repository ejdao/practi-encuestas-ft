import { Routes } from '@angular/router';
import { AuthoritiesGuard } from '@common/guards';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'caracterizacion-hogar',
        canActivate: [AuthoritiesGuard],
        loadComponent: () =>
          import('@encuestas/presentation/pages/caracterizacion-hogar').then((m) => m.Page),
        data: {
          title: 'Caracterización del hogar',
          /* authorities: [ENC_AUTHORITIES.BASICO.REALIZAR], */
        },
      },
      {
        path: 'jefes-hogar',
        canActivate: [AuthoritiesGuard],
        loadComponent: () =>
          import('@encuestas/presentation/pages/jefes-hogar').then((m) => m.Page),
        data: {
          title: 'Jefes del hogar',
          /* authorities: [ENC_AUTHORITIES.BASICO.REALIZAR], */
        },
      },
    ],
  },
];
