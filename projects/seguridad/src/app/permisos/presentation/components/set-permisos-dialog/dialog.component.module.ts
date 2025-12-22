import { NgModule } from '@angular/core';
import { SetPermisosDialog } from './dialog.component';
import { TsdFieldsModule } from '@toshida/ng-components/fields';
import { MatButtonModule } from '@toshida/material/button';
import { MatIconModule } from '@toshida/material/icon';
import { MatToolbarModule } from '@toshida/material/toolbar';
import { MatCheckboxModule } from '@toshida/material/checkbox';
import { GcmDialogModule } from '../dialog';
import { MatRadioModule } from '@toshida/material/radio';
import {
  PermisoCrudController,
  PermisoRolController,
  PermisoUsuarioController,
} from '@seguridad/permisos/presentation/controllers';
import { MatDividerModule } from '@toshida/material/divider';

@NgModule({
  declarations: [SetPermisosDialog],
  imports: [
    MatIconModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatRadioModule,
    TsdFieldsModule,
    GcmDialogModule,
    MatButtonModule,
    MatDividerModule,
  ],
  providers: [PermisoUsuarioController, PermisoRolController, PermisoCrudController],
})
export class SetPermisosDialogModule {}
