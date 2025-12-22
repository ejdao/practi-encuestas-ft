import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioProxyRepository } from '@seguridad/permisos/infrastructure/repositories';
import { UsuarioCrud } from '@seguridad/permisos/application/interactors';
import { Usuario, Permiso } from '@seguridad/permisos/domain/entities';
import { Either } from '@kato-lee/utilities';

type Result = Either<boolean, Usuario[]>;
type Result2 = Either<string, Permiso[]>;

@Injectable()
export class UsuarioCrudController {
  private _usuariosSaved = new BehaviorSubject<Usuario[]>([]);
  private _usuarios$ = this._usuariosSaved.asObservable();

  constructor(private _usuarios: UsuarioProxyRepository) {}

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
      const usuarioCrud = new UsuarioCrud(this._usuarios);

      const usuarios = await usuarioCrud.fetchAuthorities(id);

      return Either.right(usuarios);
    } catch (_) {
      return Either.left(_);
    }
  }

  public observable(): Observable<Usuario[]> {
    return this._usuarios$;
  }
}
