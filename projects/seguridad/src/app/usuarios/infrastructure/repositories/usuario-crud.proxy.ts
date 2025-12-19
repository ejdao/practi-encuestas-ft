import { BehaviorSubject, firstValueFrom, map, Observable, tap } from 'rxjs';
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchUsuarioRes } from '../responses';
import { usuarioResToEntity } from '../factories';
import { UsuarioCrudRepository } from '@seguridad/usuarios/domain/repositories';
import { Usuario } from '@seguridad/usuarios/domain/entities';
import { SEG_END_POINTS } from '@seguridad/end-points';
import { DataStoredI } from '@common/models';

@Injectable()
export class UsuarioCrudProxy implements UsuarioCrudRepository {
  private subject = new BehaviorSubject<DataStoredI<Usuario>>(new DataStoredI([], null));
  private _observable$ = this.subject.asObservable();

  constructor(private _http: HttpClient) {}

  async fetch(refresh: boolean): Promise<Usuario[]> {
    if (this.subject.value.updatedAt && !refresh) return this.subject.value.data;

    return firstValueFrom(
      this._http.get<FetchUsuarioRes[]>(`${SEG_END_POINTS.V1.USUARIOS}`).pipe(
        map((res) => res.map((el) => usuarioResToEntity(el))),
        tap((data) => this.subject.next(new DataStoredI(data, new Date()))),
      ),
    );
  }

  public resetPassword(id: string): Promise<boolean> {
    return firstValueFrom(
      this._http.get<boolean>(`${SEG_END_POINTS.V1.USUARIOS}/reset-password/${id}`),
    );
  }

  observable(): Observable<DataStoredI<Usuario>> {
    return this._observable$;
  }
}
