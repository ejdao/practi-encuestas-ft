import { ADMIN_AUTHORITY } from '@authorities/principal';
import { TakSnavItems } from '@toshida/ng-components/layouts/admin-takkion';

const adAut = ADMIN_AUTHORITY;

export const ENCUESTAS_SNAV_ITEMS: TakSnavItems[] = [
  {
    type: 'dropdown',
    name: 'Encuestas',
    url: `encuestas`,
    icon: 'content_paste',
    /* authorities: [adAut, ENC_AUTHORITIES.CODE], */
    showForMobile: true,
    showForWeb: true,
    dropdownLinks: [
      {
        name: 'Caracterización del hogar',
        url: 'caracterizacion-hogar',
        /* authorities: [adAut, ENC_AUTHORITIES.BASICO.REALIZAR], */
        showForMobile: true,
        showForWeb: false,
      },
      {
        name: 'Jefes de hogar',
        url: 'jefes-hogar',
        /* authorities: [adAut, ENC_AUTHORITIES.BASICO.REALIZAR], */
        showForMobile: true,
        showForWeb: false,
      },
    ],
  },
];
