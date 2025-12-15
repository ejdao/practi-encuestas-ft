import { IS_WEB_DISPLAYED_ON_MOBILE, TsdLayoutsMenuSection } from '@toshida/ng-components/layouts';

const showedInMobile = IS_WEB_DISPLAYED_ON_MOBILE;
const urlExt = showedInMobile ? 'mobile' : 'web';

export const SEGURIDAD_SNAV_ITEMS: TsdLayoutsMenuSection[] = [
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
