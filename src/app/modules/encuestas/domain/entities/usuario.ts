export class Usuario {
  constructor(
    private _id: string,
    private _documento: string,
    private _nombreCompleto: string,
  ) {}

  get id(): string {
    return this._id;
  }

  get documento(): string {
    return this._documento;
  }

  get nombreCompleto(): string {
    return this._nombreCompleto;
  }
}
