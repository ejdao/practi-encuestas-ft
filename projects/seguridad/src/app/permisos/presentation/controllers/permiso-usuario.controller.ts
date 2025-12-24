import { Injectable } from '@angular/core';
import { Either } from '@kato-lee/utilities';
import { Permiso, Usuario } from '@seguridad/permisos/domain/entities';
import { PermisoUsuarioService } from '@seguridad/permisos/application/services';

type Result = Either<boolean, boolean>;

@Injectable()
export class PermisoUsuarioController {
  constructor(private _usuarios: PermisoUsuarioService) {}

  public async addPermiso(permiso: Permiso, usuario: Usuario): Promise<Result> {
    try {
      const result = await this._usuarios.addPermiso(permiso, usuario);
      return Either.right(result);
    } catch (error) {
      return Either.left(error);
    }
  }

  public async removePermiso(permiso: Permiso, usuario: Usuario): Promise<Result> {
    try {
      const result = await this._usuarios.removePermiso(permiso, usuario);
      return Either.right(result);
    } catch (error) {
      return Either.left(error);
    }
  }
}
