import { ParentezcoType, TipoDocEncuestadoType } from '../types';
import { Usuario } from './usuario';

export class Encuestado {
  public cantViviendasPropias = 0;
  public cantFamiliares = 0;

  constructor(
    private _id: number,
    private _nombreCompleto: string,
    private _tipoDocumento: TipoDocEncuestadoType,
    private _numeroDocumento: string,
    private _tieneLibretaMilitar: boolean,
    private _direccion: string,
    private _paretezco: ParentezcoType,
    private _creadoPor: Usuario,
    private _fechaCreacion: Date,
    private _jefeHogar: Encuestado | undefined,
  ) {}

  get id() {
    return this._id;
  }

  get nombreCompleto() {
    return this._nombreCompleto;
  }

  get tipoDocumento() {
    return this._tipoDocumento;
  }
  get numeroDocumento() {
    return this._numeroDocumento;
  }

  get tieneLibretaMilitar() {
    return this._tieneLibretaMilitar;
  }

  get direccion() {
    return this._direccion;
  }

  get paretezco() {
    return this._paretezco;
  }

  get creadoPor() {
    return this._creadoPor;
  }

  get fechaCreacion() {
    return this._fechaCreacion;
  }

  get jefeHogar() {
    return this._jefeHogar;
  }
}
