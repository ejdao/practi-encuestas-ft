import { IS_WEB_DISPLAYED_ON_MOBILE, TsdLayoutsMenuSection } from '@toshida/ng-components/layouts';
import { TakSnavItems } from '@toshida/ng-components/layouts/admin-takkion';

const showedInMobile = IS_WEB_DISPLAYED_ON_MOBILE;
const urlExt = showedInMobile ? 'mobile' : 'web';

export const SEGURIDAD_SNAV_ITEMS_TSD: TsdLayoutsMenuSection[] = [
  {
    title: 'Seguridad',
    urlExtension: `seguridad`,
    items: [
      {
        label: 'Permisos',
        urlExtension: `permisos/${urlExt}`,
        icon: '🔑',
        subitems: [{ label: 'Gestionar', url: 'manage' }],
      },
    ],
  },
];

export const SEGURIDAD_SNAV_ITEMS_TAK: TakSnavItems[] = [
  {
    type: 'collection',
    name: 'Seguridad',
    url: 'seguridad',
    icon: 'shield',
    objects: [
      {
        type: 'dropdown',
        name: 'Permisos',
        url: `permisos/${urlExt}`,
        icon: 'lock',
        dropdownLinks: [
          {
            name: 'Gestionar',
            url: 'manage',
          },
        ],
      },
    ],
  },
];
