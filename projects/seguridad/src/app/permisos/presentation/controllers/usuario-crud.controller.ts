import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario, Permiso } from '@seguridad/permisos/domain/entities';
import { UsuarioRepository } from '@seguridad/permisos/domain/repositories';
import { Either } from '@kato-lee/utilities';
import { DataStoredI } from '@common/models';

type Result = Either<string, Usuario[]>;
type Result2 = Either<string, Permiso[]>;

@Injectable()
export class UsuarioCrudController {
  constructor(private _usuarios: UsuarioRepository) {}

  public async fetch(refresh: boolean): Promise<Result> {
    try {
      const result = await this._usuarios.fetch(refresh);
      return Either.right(result);
    } catch (error) {
      return Either.left(error);
    }
  }

  public async fetchPermisos(id: string): Promise<Result2> {
    try {
      const usuarios = await this._usuarios.fetchAuthorities(id);
      return Either.right(usuarios);
    } catch (error) {
      return Either.left(error);
    }
  }

  public observable(): Observable<DataStoredI<Usuario>> {
    return this._usuarios.observable();
  }
}
