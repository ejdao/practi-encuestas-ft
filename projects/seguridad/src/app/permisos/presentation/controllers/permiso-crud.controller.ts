import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Either } from '@kato-lee/utilities';
import { PermisoProxyRepository } from '@seguridad/permisos/infrastructure/repositories';
import { Permiso } from '@seguridad/permisos/domain/entities';
import { PermisoCrud } from '@seguridad/permisos/application/interactors';

type Result = Either<boolean, Permiso[]>;

@Injectable()
export class PermisoCrudController {
  constructor(private _usuarios: PermisoProxyRepository) {}

  public async fetch(refresh = false): Promise<Result> {
    try {
      const permisoCrud = new PermisoCrud(this._usuarios);

      const permisos = await permisoCrud.fetch(refresh);

      return Either.right(permisos);
    } catch (_) {
      return Either.left(false);
    }
  }

  public observable(): Observable<Permiso[]> {
    return this._usuarios.observable();
  }
}
