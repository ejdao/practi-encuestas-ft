import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FetchUsuarioRes } from '@seguridad/usuarios/infrastructure/responses';
import { UsuarioRepository } from '@seguridad/permisos/domain/repositories';
import { Permiso } from '@seguridad/permisos/domain/entities';
import { Usuario } from '@seguridad/permisos/domain/entities';
import { SEG_END_POINTS } from '@seguridad/end-points';
import { permisoResponseToEntity } from '../factories';
import { PermisoResponse } from '../data-transfers';
import { DataStoredI } from '@common/models';

@Injectable()
export class UsuarioProxyRepository implements UsuarioRepository {
  private subject = new BehaviorSubject<DataStoredI<Usuario>>(new DataStoredI([], null));

  constructor(private _http: HttpClient) {}

  async fetch(refresh: boolean): Promise<Usuario[]> {
    if (this.subject.value.updatedAt && !refresh) return this.subject.value.data;

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
        tap((data) => this.subject.next(new DataStoredI(data, new Date()))),
      ),
    );
  }

  public fetchAuthorities(id: string): Promise<Permiso[]> {
    return firstValueFrom(
      this._http
        .get<PermisoResponse[]>(`${SEG_END_POINTS.V1.PERMISOS}/by-usuario/${id}`)
        .pipe(map((response) => response.map((res) => permisoResponseToEntity(res)))),
    );
  }
}
