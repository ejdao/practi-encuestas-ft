import { Permiso, Rol } from '@seguridad/permisos/domain/entities';

export interface PermisoRolService {
  add(permiso: Permiso, rol: Rol): Promise<boolean>;

  remove(permiso: Permiso, rol: Rol): Promise<boolean>;
}
