import { orderBy } from '@kato-lee/utilities';
import { DependenciaResponse, PermisoResponse } from '../data-transfers';
import { Permiso, tipoPermisoLevelFactory } from '@seguridad/permisos/domain/entities';

export const permisoResponseToCollection = (response: PermisoResponse[]) => {
  const allPermisos: Permiso[] = [];

  const modulos: PermisoResponse[] = [];

  response.map((el) => {
    el.tipo = 3;
    if (el.modulo) {
      if (
        !modulos.filter((m) => m.codigo === el.modulo!.codigo && m.nombre === el.modulo!.nombre)
          .length
      ) {
        modulos.push({
          id: el.modulo.id,
          isFromRol: false,
          tipo: 1,
          codigo: el.modulo.codigo,
          nombre: el.modulo.nombre,
          modulo: null,
          subModulo: null,
        });
      }
    }

    if (el.subModulo) {
      if (
        !modulos.filter(
          (m) =>
            m.codigo === `${el.modulo?.codigo}${el.subModulo!.codigo}` &&
            m.nombre === el.subModulo!.nombre,
        ).length
      ) {
        modulos.push({
          id: el.subModulo.id,
          isFromRol: false,
          tipo: 2,
          codigo: `${el.modulo?.codigo}${el.subModulo.codigo}`,
          nombre: el.subModulo.nombre,
          modulo: null,
          subModulo: null,
        });
      }
    }
  });

  response.push(...modulos);

  const permisos = response.map((permiso) => permisoResponseToEntity(permiso));

  allPermisos.push(...permisos);

  const result = orderBy(allPermisos, 'codigo', 'asc');

  return result;
};

export const permisoResponseToEntity = (permiso: PermisoResponse) => {
  const newPermiso = new Permiso(
    permiso.id,
    tipoPermisoLevelFactory(permiso.tipo),
    permiso.codigo,
    permiso.nombre,
  );

  newPermiso.modulo = permiso.modulo?.nombre || '';
  newPermiso.submodulo = permiso.subModulo?.nombre || '';
  newPermiso.isByRol = permiso.isFromRol;

  return newPermiso;
};

export const dependenciaResponseToEntity = (permiso: DependenciaResponse) => {
  const newPermiso = new Permiso(
    permiso.id,
    tipoPermisoLevelFactory(3),
    permiso.codigo,
    permiso.nombre,
  );

  if (permiso.rol) newPermiso.setRolDependiente(permiso.rol.code);

  newPermiso.modulo = '';
  newPermiso.submodulo = '';
  newPermiso.isByRol = false;

  return newPermiso;
};
