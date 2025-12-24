import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, map, Observable, tap } from 'rxjs';
import { CreateUsuarioPayload } from '@seguridad/usuarios/application/payloads';
import { UsuarioCrudRepository } from '@seguridad/usuarios/domain/repositories';
import { Usuario } from '@seguridad/usuarios/domain/entities';
import { SEG_END_POINTS } from '@seguridad/end-points';
import { usuarioResToEntity } from '../factories';
import { FetchUsuarioRes } from '../responses';
import { DataStoredI } from '@common/models';
import { usuariosObs$, usuariosSubj } from './_stores';

@Injectable()
export class UsuarioCrudProxy implements UsuarioCrudRepository {
  constructor(private _http: HttpClient) {}

  async fetch(refresh: boolean): Promise<Usuario[]> {
    if (usuariosSubj.value.updatedAt && !refresh) return usuariosSubj.value.data;

    return firstValueFrom(
      this._http.get<FetchUsuarioRes[]>(`${SEG_END_POINTS.V1.USUARIOS}`).pipe(
        map((res) => res.map((el) => usuarioResToEntity(el))),
        tap((data) => usuariosSubj.next(new DataStoredI(data, new Date()))),
      ),
    );
  }

  save(payload: CreateUsuarioPayload): Promise<boolean> {
    const url = SEG_END_POINTS.V1.USUARIOS;
    if (payload.id) return firstValueFrom(this._http.put<boolean>(`${url}/${payload.id}`, payload));
    else return firstValueFrom(this._http.post(url, payload).pipe(map(() => true)));
  }

  resetPassword(id: string): Promise<boolean> {
    return firstValueFrom(
      this._http.get<boolean>(`${SEG_END_POINTS.V1.USUARIOS}/reset-password/${id}`),
    );
  }

  observable(): Observable<DataStoredI<Usuario>> {
    return usuariosObs$;
  }
}
