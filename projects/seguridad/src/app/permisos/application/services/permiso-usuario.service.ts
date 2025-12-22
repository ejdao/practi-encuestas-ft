import { Permiso, Usuario } from '@seguridad/permisos/domain/entities';

export abstract class PermisoUsuarioService {
  abstract addPermiso(permiso: Permiso, usuario: Usuario): Promise<boolean>;
  abstract removePermiso(permiso: Permiso, usuario: Usuario): Promise<boolean>;
}
