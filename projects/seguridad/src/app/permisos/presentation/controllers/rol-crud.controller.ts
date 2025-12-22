import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Either } from '@kato-lee/utilities';
import { RolRepository } from '@seguridad/permisos/domain/repositories';
import { Rol } from '@seguridad/permisos/domain/entities';

type Result = Either<string, Rol[]>;

@Injectable()
export class RolCrudController {
  constructor(private _roles: RolRepository) {}

  public async fetch(refresh = false): Promise<Result> {
    try {
      const roles = await this._roles.fetch(refresh);
      return Either.right(roles);
    } catch (error) {
      return Either.left(error);
    }
  }

  public observable(): Observable<Rol[]> {
    return this._roles.observable();
  }
}
