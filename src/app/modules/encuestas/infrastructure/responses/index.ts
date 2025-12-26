import { ParentezcoCode, TipoDocEncuestadoCode, TipoPreguntaCode } from '@encuestas/domain/types';

export interface PreguntaRes {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: {
    code: TipoPreguntaCode;
    forHumans: string;
  };
  limSelMultiOrCarac?: number;
  isOpcional: boolean;
  opciones: [
    {
      id: number;
      orden: number;
      nombre: string;
    },
  ];
  complemento: PreguntaRes[];
  preguntaClaveId: number | null;
  opcionClaveId: number | null;
}

export interface EncuestaRes {
  id: number;
  nombre: string;
  preguntas: PreguntaRes[];
}

export interface EncuestadoRes {
  id: number;
  nombreCompleto: string;
  tipoDocumento: {
    code: TipoDocEncuestadoCode;
    forHumans: string;
    abbreviation: string | undefined;
  };
  numeroDocumento: string;
  tieneLibretaMilitar: boolean;
  direccion: string;
  parentezco: {
    code: ParentezcoCode;
    forHumans: string;
    abbreviation: string | undefined;
  };
  jefeHogar: EncuestadoRes;
  creadoPor: {
    cedula: string;
    nombreCompleto: string;
  };
  cantViviendasPropias: number;
  cantFamiliares: number;
  fechaCreacion: Date;
}
