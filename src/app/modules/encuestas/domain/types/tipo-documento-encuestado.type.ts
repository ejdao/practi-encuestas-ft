import { CtmType } from '@common/types';

export type TipoDocEncuestadoCode = 1 | 2 | 3 | 4 | 5;

export class TipoDocEncuestadoType extends CtmType<TipoDocEncuestadoCode> {}

const REGISTRO_CIVIL = new TipoDocEncuestadoType(1, 'REGISTRO CIVIL', 'RC');
const TARJETA_IDENTIDAD = new TipoDocEncuestadoType(2, 'TARJETA DE IDENTIDAD', 'TI');
const CEDULA_CIUDADANIA = new TipoDocEncuestadoType(3, 'CEDULA DE CIUDADANIA', 'CC');
const CEDULA_EXTRANJERA = new TipoDocEncuestadoType(4, 'CEDULA EXTRANJERA', 'CE');
const SIN_DOCUMENTO = new TipoDocEncuestadoType(5, 'SIN DOCUMENTO', 'SD');

export function tipoDocEncuestadoTypeFactory(code: TipoDocEncuestadoCode): TipoDocEncuestadoType {
  switch (code) {
    case 1: return REGISTRO_CIVIL;
    case 2: return TARJETA_IDENTIDAD;
    case 3: return CEDULA_CIUDADANIA;
    case 4: return CEDULA_EXTRANJERA;
    case 5: return SIN_DOCUMENTO;
    default: throw new Error('No existe tipo de documento valido con este codigo');
  }
}

export const TIPOS_DOCUMENTO = {
  REGISTRO_CIVIL,
  TARJETA_IDENTIDAD,
  CEDULA_CIUDADANIA,
  CEDULA_EXTRANJERA,
  SIN_DOCUMENTO,
};

export const TIPOS_DOCUMENTO_VALUES = [
  REGISTRO_CIVIL,
  TARJETA_IDENTIDAD,
  CEDULA_CIUDADANIA,
  CEDULA_EXTRANJERA,
  SIN_DOCUMENTO,
];
