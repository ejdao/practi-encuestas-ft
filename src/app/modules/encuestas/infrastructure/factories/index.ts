import { Encuesta, Encuestado, Opcion, Pregunta } from '@encuestas/domain/entities';
import {
  parentezcoTypeFactory,
  tipoDocEncuestadoTypeFactory,
  tipoPreguntaTypeFactory,
} from '@encuestas/domain/types';
import { EncuestadoRes, EncuestaRes } from '../responses';
import { Usuario } from '@encuestas/domain/entities/usuario';

export const encuestaResToEncuestaFactory = (data: EncuestaRes): Encuesta => {
  return new Encuesta(
    data.id,
    data.nombre,
    data.preguntas.map((p) => {
      return new Pregunta(
        p.id,
        p.nombre,
        p.descripcion,
        tipoPreguntaTypeFactory(p.tipo.code),
        p.opciones.map((o) => {
          return new Opcion(o.id, o.orden, o.nombre);
        }),
        p.complemento.map((c) => {
          return new Pregunta(
            c.id,
            c.nombre,
            c.descripcion,
            tipoPreguntaTypeFactory(c.tipo.code),
            c.opciones.map((o) => {
              return new Opcion(o.id, o.orden, o.nombre);
            }),
            [],
            c.limSelMultiOrCarac!,
            c.isOpcional,
            c.preguntaClaveId,
            c.opcionClaveId,
          );
        }),
        p.limSelMultiOrCarac!,
        p.isOpcional,
        p.preguntaClaveId,
        p.opcionClaveId,
      );
    }),
  );
};

export const dataToEncuestadoFactory = (data: EncuestadoRes): Encuestado => {
  const e = new Encuestado(
    data.id,
    data.nombreCompleto,
    tipoDocEncuestadoTypeFactory(data.tipoDocumento.code),
    data.numeroDocumento,
    data.tieneLibretaMilitar,
    data.direccion,
    parentezcoTypeFactory(data.parentezco.code),
    new Usuario(undefined!, data.creadoPor.cedula, data.creadoPor.nombreCompleto),
    new Date(data.fechaCreacion),
    data.jefeHogar ? dataToEncuestadoFactory(data.jefeHogar) : undefined,
  );
  e.cantFamiliares = data.cantFamiliares;
  e.cantViviendasPropias = data.cantViviendasPropias;
  return e;
};
