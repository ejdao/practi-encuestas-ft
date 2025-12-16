import { environment } from '@environments/environment';

export const STORE_END_POINTS = {
  V1: {
    CONFIG: {
      MY_AUTH_DATA: `${environment.apiUrlGen}/auth/data`,
    },
  },
};
