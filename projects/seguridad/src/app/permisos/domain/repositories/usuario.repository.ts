import { Usuario } from '@seguridad/permisos/domain/entities';
import { Permiso } from '../entities';

export interface UsuarioRepository {
  fetch(refresh: boolean): Promise<Usuario[]>;
  fetchAuthorities(id: string): Promise<Permiso[]>;
}
