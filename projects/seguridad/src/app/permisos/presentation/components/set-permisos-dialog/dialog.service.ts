import { Injectable } from '@angular/core';
import { SetPermisosDialog } from './dialog.component';
import { MatDialog } from '@toshida/material/dialog';
import { Rol, Usuario } from '@seguridad/permisos/domain/entities';

@Injectable()
export class SetPermisosDialogService {
  constructor(private _dialog: MatDialog) {}

  public open(data: Usuario | Rol, tipoEntidad: 'usuario' | 'rol') {
    return this._dialog.open(SetPermisosDialog, {
      data: { data, tipoEntidad },
      disableClose: true,
    });
  }
}
