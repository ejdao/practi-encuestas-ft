import { CtmTypeI } from '@common/models';

export class Rol {
  constructor(
    private _id: string,
    private _nombre: string,
  ) {}

  get id(): string {
    return this._id;
  }

  get nombre(): string {
    return this._nombre;
  }
}
