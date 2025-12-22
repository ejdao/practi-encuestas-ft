import { Injectable } from '@angular/core';
import { Either } from '@kato-lee/utilities';
import { PermisoUsuarioApplication } from '@seguridad/permisos/infrastructure/services';
import { PermisoUsuario } from '@seguridad/permisos/application/interactors';
import { Permiso, Usuario } from '@seguridad/permisos/domain/entities';

type Result = Either<boolean, boolean>;

@Injectable()
export class PermisoUsuarioController {
  constructor(private _usuarios: PermisoUsuarioApplication) {}

  public async addPermiso(permiso: Permiso, usuario: Usuario): Promise<Result> {
    try {
      const permisoUsuario = new PermisoUsuario(this._usuarios);

      const result = await permisoUsuario.add(permiso, usuario);

      return Either.right(result);
    } catch (_) {
      return Either.left(false);
    }
  }

  public async removePermiso(permiso: Permiso, usuario: Usuario): Promise<Result> {
    try {
      const permisoUsuario = new PermisoUsuario(this._usuarios);

      const result = await permisoUsuario.remove(permiso, usuario);

      return Either.right(result);
    } catch (_) {
      return Either.left(false);
    }
  }
}
