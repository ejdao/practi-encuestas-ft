import { PermisoRepository } from '@seguridad/permisos/domain/repositories';
import { Permiso } from '@seguridad/permisos/domain/entities';

export class PermisoCrud {
  constructor(private _permisos: PermisoRepository) {}

  public fetch(refresh: boolean): Promise<Permiso[]> {
    return this._permisos.fetch(refresh);
  }
}
