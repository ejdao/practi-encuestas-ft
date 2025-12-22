import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Either } from '@kato-lee/utilities';
import { PermisoCrud } from '@seguridad/permisos/application/interactors';
import { Permiso } from '@seguridad/permisos/domain/entities';
import { PermisoRepository } from '@seguridad/permisos/domain/repositories';

type Result = Either<boolean, Permiso[]>;

@Injectable()
export class PermisoCrudController {
  constructor(private _usuarios: PermisoRepository) {}

  public async fetch(refresh = false): Promise<Result> {
    try {
      const permisos = await this._usuarios.fetch(refresh);
      return Either.right(permisos);
    } catch (_) {
      return Either.left(false);
    }
  }

  public observable(): Observable<Permiso[]> {
    return this._usuarios.observable();
  }
}
