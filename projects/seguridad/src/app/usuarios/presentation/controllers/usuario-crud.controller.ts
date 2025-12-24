import { Injectable } from '@angular/core';
import { DataStoredI } from '@common/models';
import { Either } from '@kato-lee/utilities';
import { CreateUsuarioPayload } from '@seguridad/usuarios/application/payloads';
import { Usuario } from '@seguridad/usuarios/domain/entities';
import { UsuarioCrudRepository } from '@seguridad/usuarios/domain/repositories';
import { Observable } from 'rxjs';

type Result1 = Either<string, Usuario[]>;
type Result2 = Either<string, boolean>;

@Injectable()
export class UsuarioCrudController {
  constructor(private _usuarios: UsuarioCrudRepository) {}

  public async fetch(refresh: boolean): Promise<Result1> {
    try {
      const result = await this._usuarios.fetch(refresh);
      return Either.right(result);
    } catch (error) {
      return Either.left(error);
    }
  }

  public async save(payload: CreateUsuarioPayload): Promise<Result2> {
    try {
      const result = await this._usuarios.save(payload);
      return Either.right(result);
    } catch (error) {
      return Either.left(error);
    }
  }

  public async resetPassword(id: string): Promise<Result2> {
    try {
      const result = await this._usuarios.resetPassword(id);
      return Either.right(result);
    } catch (error) {
      return Either.left(error);
    }
  }

  public observable(): Observable<DataStoredI<Usuario>> {
    return this._usuarios.observable();
  }
}
