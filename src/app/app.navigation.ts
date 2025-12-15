import { TsdLayoutsMenuSection } from '@toshida/ng-components/layouts';
import { SEGURIDAD_SNAV_ITEMS } from '@navigation/seguridad';

export const APP_NAVIGATION: TsdLayoutsMenuSection[] = [
  {
    title: 'Principal',
    items: [{ label: 'Dashboard', icon: '📊', active: true, url: '' }],
  },
  ...SEGURIDAD_SNAV_ITEMS,
];
