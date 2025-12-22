import { Permiso, Usuario } from '@seguridad/permisos/domain/entities';
import { PermisoUsuarioService } from '../services';

export class PermisoUsuario {
  constructor(private _permisoUsuario: PermisoUsuarioService) {}

  public add(permiso: Permiso, usuario: Usuario): Promise<boolean> {
    return this._permisoUsuario.addPermiso(permiso, usuario);
  }

  public remove(permiso: Permiso, usuario: Usuario): Promise<boolean> {
    return this._permisoUsuario.removePermiso(permiso, usuario);
  }
}
