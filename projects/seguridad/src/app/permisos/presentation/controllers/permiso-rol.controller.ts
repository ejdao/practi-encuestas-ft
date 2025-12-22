import { Injectable } from '@angular/core';
import { Either } from '@kato-lee/utilities';
import { PermisoRolApplication } from '@seguridad/permisos/infrastructure/services';
import { PermisoRol } from '@seguridad/permisos/application/interactors';
import { Permiso, Rol } from '@seguridad/permisos/domain/entities';

type Result = Either<boolean, boolean>;

@Injectable()
export class PermisoRolController {
  constructor(private _roles: PermisoRolApplication) {}

  public async add(permiso: Permiso, rol: Rol): Promise<Result> {
    try {
      const permisoRol = new PermisoRol(this._roles);

      const result = await permisoRol.add(permiso, rol);

      return Either.right(result);
    } catch (_) {
      return Either.left(false);
    }
  }

  public async remove(permiso: Permiso, rol: Rol): Promise<Result> {
    try {
      const permisoRol = new PermisoRol(this._roles);

      const result = await permisoRol.remove(permiso, rol);

      return Either.right(result);
    } catch (_) {
      return Either.left(false);
    }
  }
}
