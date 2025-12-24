import { Permiso, Rol } from '@seguridad/permisos/domain/entities';

export abstract class PermisoRolService {
  abstract add(permiso: Permiso, rol: Rol): Promise<boolean>;
  abstract remove(permiso: Permiso, rol: Rol): Promise<boolean>;
}
