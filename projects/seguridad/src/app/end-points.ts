import { environment } from '@environments/environment';

export const SEG_END_POINTS = {
  V1: {
    AUTH: `${environment.apiUrlGen}/v1/auth`,
    USUARIOS: `${environment.apiUrlGen}/v1/gen/usuarios`,
    PERMISOS: `${environment.apiUrlGen}/v1/gen/permisos`,
    ROLES: `${environment.apiUrlGen}/v1/gen/roles`,
    MODULOS: `${environment.apiUrlGen}/v1/gen/modulos`,
    SUBMODULOS: `${environment.apiUrlGen}/v1/gen/sub-modulos`,
  },
};
