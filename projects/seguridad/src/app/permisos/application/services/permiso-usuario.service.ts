import { Permiso, Usuario } from '@seguridad/permisos/domain/entities';

export interface PermisoUsuarioService {
  addPermiso(permiso: Permiso, usuario: Usuario): Promise<boolean>;
  removePermiso(permiso: Permiso, usuario: Usuario): Promise<boolean>;
}
