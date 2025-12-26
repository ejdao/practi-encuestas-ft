export * from './encuesta';
export * from './encuestado';

export class EntidadBasica {
  constructor(
    private _id: number,
    private _codigo: string,
    private _nombre: string,
  ) {}

  get id() {
    return this._id;
  }

  get codigo() {
    return this._codigo;
  }

  get nombre() {
    return this._nombre;
  }
}
