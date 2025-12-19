import {
  estadoUsuarioTypeFactory,
  tipoDocUsuarioTypeFactory,
} from '@seguridad/usuarios/domain/types';
import { FetchUsuarioRes } from '../responses';
import { Rol, Usuario } from '@seguridad/usuarios/domain/entities';

export const usuarioResToEntity = (el: FetchUsuarioRes): Usuario => {
  const res = new Usuario(
    el.id,
    el.documento,
    el.primerNombre,
    el.segundoNombre,
    el.primerApellido,
    el.segundoApellido,
    el.nombreCompleto,
    el.numeroContactoPrincipal,
    el.numeroContactoSecundario,
    el.email,
    el.ultimoAcceso,
    el.isPasswordReiniciada,
    new Rol(el.rol.id, el.rol.nombre),
    estadoUsuarioTypeFactory(el.estado.code),
    tipoDocUsuarioTypeFactory(el.tipoDocumento.code),
  );
  return res;
};
