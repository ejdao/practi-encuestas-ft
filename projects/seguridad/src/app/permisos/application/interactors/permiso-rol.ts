import { Permiso, Rol } from '@seguridad/permisos/domain/entities';
import { PermisoRolService } from '../services';

export class PermisoRol {
  constructor(private _permisoRol: PermisoRolService) {}

  public add(permiso: Permiso, rol: Rol): Promise<boolean> {
    return this._permisoRol.add(permiso, rol);
  }

  public remove(permiso: Permiso, rol: Rol): Promise<boolean> {
    return this._permisoRol.remove(permiso, rol);
  }
}
