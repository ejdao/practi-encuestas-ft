import { CtmTypeRes } from '@common/models';

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
  estado: CtmTypeRes;
  tipoDocumento: CtmTypeRes;
}
