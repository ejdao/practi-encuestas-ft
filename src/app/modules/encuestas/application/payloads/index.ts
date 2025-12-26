import { ParentezcoType } from '@encuestas/domain/types';

export interface RespuestaEncuestaPayload {
  preguntaId: number;
  respuesta: string | boolean | number | number[];
}

export interface FetchEncuestadosPayload {
  pattern?: string;
  parentezco?: ParentezcoType;
  onlyCreatedByMe?: boolean;
  forComplement?: boolean;
}
