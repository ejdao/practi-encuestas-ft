import { CtmTypeI, EntidadBasicaI } from '@common/models';
import { EstadoUsuarioCode, TipoDocUsuarioCode } from '@seguridad/usuarios/domain/types';

interface RolRes {
  id: string;
  nombre: string;
}

export interface FetchUsuarioRes {
  id: string;
  documento: string;
  primerNombre: string;
  segundoNombre: string | null;
  primerApellido: string;
  segundoApellido: string | null;
  nombreCompleto: string;
  numeroContactoPrincipal: string | null;
  numeroContactoSecundario: string | null;
  email: string | null;
  ultimoAcceso: Date;
  isPasswordReiniciada: boolean;
  rol: RolRes;
  estado: CtmTypeI<EstadoUsuarioCode>;
  tipoDocumento: CtmTypeI<TipoDocUsuarioCode>;
}

export interface UsuarioToEditRes {
  id: string;
  tipoDocumentoCode: number;
  documento: string;
  primerNombre: string;
  segundoNombre: string | null;
  primerApellido: string;
  segundoApellido: string | null;
  nombreCompleto: string;
  numeroContactoPrincipal: string | null;
  numeroContactoSecundario: string | null;
  email: string | null;
  rol: EntidadBasicaI;
  estado: CtmTypeI<EstadoUsuarioCode>;
}
