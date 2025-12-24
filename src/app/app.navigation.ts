import { SEGURIDAD_SNAV_ITEMS } from '@navigation/seguridad';
import { TakSnavItems } from '@toshida/ng-components/layouts/admin-takkion';

export const APP_NAVIGATION: TakSnavItems[] = [
  {
    type: 'link',
    name: 'Home',
    icon: 'dashboard',
    url: 'home',
  },
  ...SEGURIDAD_SNAV_ITEMS,
];
