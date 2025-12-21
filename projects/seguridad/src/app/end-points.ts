import { environment } from '@environments/environment';

export const SEG_END_POINTS = {
  V1: {
    AUTH: `${environment.apiUrlGen}/v1/auth`,
    USUARIOS: `${environment.apiUrlGen}/v1/gen/usuarios`,
    ROLES: `${environment.apiUrlGen}/v1/gen/roles`,
  },
};
