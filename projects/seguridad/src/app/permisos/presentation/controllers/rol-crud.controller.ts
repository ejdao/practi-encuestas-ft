import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Either } from '@kato-lee/utilities';
import { RolProxyRepository } from '@seguridad/permisos/infrastructure/repositories';
import { RolCrud } from '@seguridad/permisos/application/interactors';
import { Rol } from '@seguridad/permisos/domain/entities';

type Result = Either<boolean, Rol[]>;

@Injectable()
export class RolCrudController {
  constructor(private _roles: RolProxyRepository) {}

  public async fetch(refresh = false): Promise<Result> {
    try {
      const rolCrud = new RolCrud(this._roles);

      const roles = await rolCrud.fetch(refresh);

      return Either.right(roles);
    } catch (_) {
      return Either.left(false);
    }
  }

  public observable(): Observable<Rol[]> {
    return this._roles.observable();
  }
}
