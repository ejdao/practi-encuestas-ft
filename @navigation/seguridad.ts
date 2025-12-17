import { GEN_AUTHORITIES } from '@authorities/general';
import { ADMIN_AUTHORITY } from '@authorities/principal';
import { TakSnavItems } from '@toshida/ng-components/layouts/admin-takkion';

const adAut = ADMIN_AUTHORITY;

export const SEGURIDAD_SNAV_ITEMS: TakSnavItems[] = [
  {
    type: 'collection',
    name: 'Seguridad',
    url: 'seguridad',
    icon: 'general_device',
    authorities: [adAut, GEN_AUTHORITIES.CODE],
    showForMobile: true,
    showForWeb: true,
    objects: [
      {
        type: 'dropdown',
        name: 'Usuarios',
        url: 'usuarios',
        icon: 'person',
        authorities: [adAut, GEN_AUTHORITIES.SEGURIDAD.CODE],
        showForMobile: true,
        showForWeb: true,
        dropdownLinks: [
          {
            name: 'Lista',
            url: 'list',
            authorities: [adAut, GEN_AUTHORITIES.SEGURIDAD.REGISTRAR_ACTUALIZAR_USUARIOS],
            showForMobile: true,
            showForWeb: true,
          },
          {
            name: 'Gestionar',
            url: 'manage',
            authorities: [adAut, GEN_AUTHORITIES.SEGURIDAD.REGISTRAR_ACTUALIZAR_USUARIOS],
            showForMobile: true,
            showForWeb: true,
          },
        ],
      },
      {
        type: 'dropdown',
        name: 'Permisos',
        url: 'permisos',
        icon: 'lock',
        authorities: [adAut, GEN_AUTHORITIES.SEGURIDAD.CODE],
        showForMobile: true,
        showForWeb: true,
        dropdownLinks: [
          {
            name: 'Crear modulos, submodulos y permisos',
            url: 'create',
            authorities: [adAut, GEN_AUTHORITIES.SEGURIDAD.CREAR_PERMISOS],
            showForMobile: true,
            showForWeb: true,
          },
          {
            name: 'Gestionar permisos por usuario',
            url: 'manage-by-usuario',
            authorities: [adAut, GEN_AUTHORITIES.SEGURIDAD.GESTIONAR_PERMISOS_USUARIO_ROL],
            showForMobile: true,
            showForWeb: true,
          },
          {
            name: 'Gestionar permisos por rol',
            url: 'manage-by-rol',
            authorities: [adAut, GEN_AUTHORITIES.SEGURIDAD.GESTIONAR_PERMISOS_USUARIO_ROL],
            showForMobile: true,
            showForWeb: true,
          },
        ],
      },
    ],
  },
];
