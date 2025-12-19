import { CtmTypeRes } from '@common/models';
import { Rol } from './rol.entity';

export class Usuario {
  nombreRol: string;

  constructor(
    private _id: string,
    private _documento: string,
    private _primerNombre: string,
    private _segundoNombre: string | null,
    private _primerApellido: string,
    private _segundoApellido: string | null,
    private _nombreCompleto: string,
    private _numeroContactoPrincipal: string | null,
    private _numeroContactoSecundario: string | null,
    private _email: string | null,
    private _ultimoAcceso: Date,
    private _isPasswordReiniciada: boolean,
    private _rol: Rol,
    private _estado: CtmTypeRes,
    private _tipoDocumento: CtmTypeRes,
  ) {
    this.nombreRol = _rol.nombre;
  }

  get id(): string {
    return this._id;
  }

  get documento(): string {
    return this._documento;
  }

  get primerNombre(): string {
    return this._primerNombre;
  }

  get segundoNombre(): string | null {
    return this._segundoNombre;
  }

  get primerApellido(): string {
    return this._primerApellido;
  }

  get segundoApellido(): string | null {
    return this._segundoApellido;
  }

  get nombreCompleto(): string {
    return this._nombreCompleto;
  }

  get numeroContactoPrincipal(): string | null {
    return this._numeroContactoPrincipal;
  }

  get numeroContactoSecundario(): string | null {
    return this._numeroContactoSecundario;
  }

  get email(): string | null {
    return this._email;
  }

  get ultimoAcceso(): Date {
    return this._ultimoAcceso;
  }

  get isPasswordReiniciada(): boolean {
    return this._isPasswordReiniciada;
  }

  get rol(): Rol {
    return this._rol;
  }

  get estado(): CtmTypeRes {
    return this._estado;
  }

  get tipoDocumento(): CtmTypeRes {
    return this._tipoDocumento;
  }
}
