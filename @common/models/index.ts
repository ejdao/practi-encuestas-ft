export * from './token';

export interface EntidadBasicaI {
  id: number;
  codigo: string;
  nombre: string;
}

export interface CtmTypeI<T> {
  code: T;
  forHumans: string;
  abbreviation?: string;
}

export class DataStoredI<T> {
  constructor(
    private _data: T[],
    private _updatedAt: Date | null,
  ) {}

  get data() {
    return this._data;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}
