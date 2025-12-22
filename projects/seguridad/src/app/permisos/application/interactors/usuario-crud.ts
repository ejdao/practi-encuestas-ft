import { UsuarioRepository } from '@seguridad/permisos/domain/repositories';
import { Permiso } from '@seguridad/permisos/domain/entities';

export class UsuarioCrud {
  constructor(private _usuarios: UsuarioRepository) {}

  public fetchAuthorities(id: string): Promise<Permiso[]> {
    return this._usuarios.fetchAuthorities(id);
  }
}
