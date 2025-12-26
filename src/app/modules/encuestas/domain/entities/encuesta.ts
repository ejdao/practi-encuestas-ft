import { FormControl } from '@angular/forms';
import { TipoPreguntaType, TIPOS_PREGUNTA } from '../types';

export class Opcion {
  completed!: boolean;

  constructor(
    private _id: number,
    private _orden: number,
    private _nombre: string,
  ) {}

  get id() {
    return this._id;
  }

  get orden() {
    return this._orden;
  }

  get nombre() {
    return this._nombre;
  }
}

export class Pregunta {
  ignored = false;
  completed = false;
  cantidadOpcionesSeleccionadas = 0;
  respuesta!: string | boolean | number | number[];
  respuestaIfIsDate!: string | boolean | number | number[];
  entidadSeleccionada!: any;

  paisId!: number;
  departamentoId = new FormControl<number>(null!);
  municipioId = new FormControl<number>(null!);
  corregimientoId = new FormControl<number>(null!);

  constructor(
    private _id: number,
    private _nombre: string,
    private _descripcion: string,
    private _tipo: TipoPreguntaType,
    private _opciones: Opcion[],
    private _complemento: Pregunta[],
    private _limSelMultiOrCarac: number,
    private _isOpcional: boolean,
    private _preguntaClaveId: number | null,
    private _opcionClaveId: number | null,
  ) {
    if (this.tipo === TIPOS_PREGUNTA.SELECCION_MULTIPLE) this.respuesta = [];
    if (this.tipo === TIPOS_PREGUNTA.SELECCION_UNICA) this.respuesta = undefined!;
    if (this.tipo === TIPOS_PREGUNTA.ABIERTA_LARGA) this.respuesta = '';
    if (this.tipo === TIPOS_PREGUNTA.ABIERTA_CORTA) this.respuesta = '';
    if (this.tipo === TIPOS_PREGUNTA.VALOR_MONETARIO) this.respuesta = 0;
    if (this.tipo === TIPOS_PREGUNTA.ABIERTA_NUMERICO) this.respuesta = undefined!;
  }

  get id() {
    return this._id;
  }

  get nombre() {
    return this._nombre;
  }

  get descripcion() {
    return this._descripcion;
  }

  get tipo() {
    return this._tipo;
  }

  get opciones() {
    return this._opciones;
  }

  get complemento() {
    return this._complemento;
  }

  get limSelMultiOrCarac() {
    return this._limSelMultiOrCarac;
  }

  get isOpcional() {
    return this._isOpcional;
  }

  get preguntaClaveId() {
    return this._preguntaClaveId;
  }

  get opcionClaveId() {
    return this._opcionClaveId;
  }

  get hasRespuesta() {
    if (!this.ignored) {
      if (this.isOpcional && !this.respuesta) return true;
      else if (this.tipo === TIPOS_PREGUNTA.SELECCION_MULTIPLE)
        return this.limSelMultiOrCarac
          ? this.cantidadOpcionesSeleccionadas === this.limSelMultiOrCarac
          : true;
      else if (this.tipo === TIPOS_PREGUNTA.ABIERTA_LARGA) return this.respuesta !== '';
      else if (this.tipo === TIPOS_PREGUNTA.ABIERTA_CORTA) return this.respuesta !== '';
      else if ([TIPOS_PREGUNTA.ABIERTA_NUMERICO, TIPOS_PREGUNTA.SI_NO].indexOf(this.tipo) >= 0) {
        return [null, undefined].indexOf(this.respuesta as any) < 0;
      } else if (this.tipo === TIPOS_PREGUNTA.SELECCION_UNICA) return this.respuesta !== undefined;
      else return this.respuesta;
    } else {
      return true;
    }
  }

  get complementadaHasRespuestas() {
    let response = true;

    this._complemento.forEach((c) => {
      if (!c.hasRespuesta) {
        response = false;
      }
    });

    return response;
  }
}

export class Encuesta {
  constructor(
    private _id: number,
    private _nombre: string,
    private _preguntas: Pregunta[],
  ) {}

  get id() {
    return this._id;
  }

  get nombre() {
    return this._nombre;
  }

  get preguntas() {
    return this._preguntas;
  }
}
