import { RolRepository } from '@seguridad/permisos/domain/repositories';
import { Rol } from '@seguridad/permisos/domain/entities';

export class RolCrud {
  constructor(private _roles: RolRepository) {}

  public fetch(refresh: boolean): Promise<Rol[]> {
    return this._roles.fetch(refresh);
  }
}
