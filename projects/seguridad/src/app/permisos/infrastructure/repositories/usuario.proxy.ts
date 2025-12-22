import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map, Observable, tap } from 'rxjs';
import { FetchUsuarioRes } from '@seguridad/usuarios/infrastructure/responses';
import { UsuarioRepository } from '@seguridad/permisos/domain/repositories';
import { Permiso } from '@seguridad/permisos/domain/entities';
import { Usuario } from '@seguridad/permisos/domain/entities';
import { SEG_END_POINTS } from '@seguridad/end-points';
import { permisoResponseToEntity } from '../factories';
import { usuariosObs$, usuariosSubj } from './_stores';
import { AuthoritiesRes } from '../data-transfers';
import { DataStoredI } from '@common/models';

@Injectable()
export class UsuarioProxyRepository implements UsuarioRepository {
  constructor(private _http: HttpClient) {}

  async fetch(refresh: boolean): Promise<Usuario[]> {
    if (usuariosSubj.value.updatedAt && !refresh) return usuariosSubj.value.data;

    return firstValueFrom(
      this._http.get<FetchUsuarioRes[]>(`${SEG_END_POINTS.V1.USUARIOS}`).pipe(
        map((res) =>
          res.map((el) => {
            return new Usuario(el.id, el.nombreCompleto, el.documento, {
              id: el.rol.id,
              name: el.rol.nombre,
            });
          }),
        ),
        tap((data) => usuariosSubj.next(new DataStoredI(data, new Date()))),
      ),
    );
  }

  fetchAuthorities(id: string): Promise<Permiso[]> {
    return firstValueFrom(
      this._http
        .get<AuthoritiesRes>(`${SEG_END_POINTS.V1.PERMISOS}/by-usuario/${id}`)
        .pipe(map((response) => response.permisos.map((res) => permisoResponseToEntity(res)))),
    );
  }

  observable(): Observable<DataStoredI<Usuario>> {
    return usuariosObs$;
  }
}
