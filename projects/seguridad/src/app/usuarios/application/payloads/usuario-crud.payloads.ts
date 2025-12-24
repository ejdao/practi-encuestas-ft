import { CtmTypeI, EntidadBasicaI } from '@common/models';
import {
  EstadoUsuarioCode,
  EstadoUsuarioType,
  TipoDocUsuarioCode,
} from '@seguridad/usuarios/domain/types';

export interface CreateUsuarioPayload {
  id?: string;
  rolId: string;
  rol: EntidadBasicaI;
  tipoDocumentoCode: TipoDocUsuarioCode;
  estadoCode: EstadoUsuarioCode;
  estado: EstadoUsuarioType;
  documento: string;
  primerNombre: string;
  segundoNombre: string | null;
  primerApellido: string;
  segundoApellido: string | null;
  numeroCelular: string | null;
  email: string | null;
}
