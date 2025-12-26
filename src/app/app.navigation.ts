import { SEGURIDAD_SNAV_ITEMS } from '@navigation/seguridad';
import { ENCUESTAS_SNAV_ITEMS } from '@navigation/encuestas';
import { TakSnavItems } from '@toshida/ng-components/layouts/admin-takkion';

export const APP_NAVIGATION: TakSnavItems[] = [
  {
    type: 'link',
    name: 'Home',
    icon: 'dashboard',
    url: 'home',
  },
  ...SEGURIDAD_SNAV_ITEMS,
  ...ENCUESTAS_SNAV_ITEMS,
];
