import { TsdLayoutsMenuSection } from '@toshida/ng-components/layouts';
import { SEGURIDAD_SNAV_ITEMS_TAK, SEGURIDAD_SNAV_ITEMS_TSD } from '@navigation/seguridad';
import { TakSnavItems } from '@toshida/ng-components/layouts/admin-takkion';

export const APP_NAVIGATION_TSD: TsdLayoutsMenuSection[] = [
  {
    title: 'Principal',
    items: [{ label: 'Dashboard', icon: '📊', active: true, url: '' }],
  },
  ...SEGURIDAD_SNAV_ITEMS_TSD,
];

export const APP_NAVIGATION_TAK: TakSnavItems[] = [
  {
    type: 'link',
    name: 'Home',
    icon: 'dashboard',
    url: 'home',
  },
  ...SEGURIDAD_SNAV_ITEMS_TAK,
];
