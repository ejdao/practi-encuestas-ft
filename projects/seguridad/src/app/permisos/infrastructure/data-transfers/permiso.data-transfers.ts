import { TipoPermisoCode } from '@seguridad/permisos/domain/entities';
import { RolDependienteCode } from '@seguridad/permisos/domain/types';

export interface PermisoResponse {
  id: string;
  codigo: string;
  nombre: string;
  modulo: ModuloRes | null;
  subModulo: ModuloRes | null;
  tipo: TipoPermisoCode;
  isFromRol: boolean;
}

export interface AuthoritiesRes {
  onlyCodigos: string;
  permisos: PermisoResponse[];
}

export interface DependenciaResponse {
  id: string;
  codigo: string;
  nombre: string;
  rol: {
    code: RolDependienteCode;
    forHumans: string;
  };
}

export interface ModuloRes {
  id: string;
  codigo: string;
  nombre: string;
}

export interface RolRes {
  id: string;
  codigo: string;
  nombre: string;
  permisos: PermisoResponse[];
}
