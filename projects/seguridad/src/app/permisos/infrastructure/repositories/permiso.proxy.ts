import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, map, Observable, tap } from 'rxjs';
import { permisoResponseToCollection } from '../factories';
import { PermisoResponse } from '../data-transfers';
import { PermisoRepository } from '@seguridad/permisos/domain/repositories';
import { Permiso } from '@seguridad/permisos/domain/entities';
import { SEG_END_POINTS } from '@seguridad/end-points';

@Injectable()
export class PermisoProxyRepository implements PermisoRepository {
  constructor(private _http: HttpClient) {}

  private _permisos = new BehaviorSubject<Permiso[]>([]);
  private _permisos$ = this._permisos.asObservable();

  public async fetch(refresh = false): Promise<Permiso[]> {
    if (this._permisos.value.length && !refresh) return this._permisos.value;

    return firstValueFrom(
      this._http.get<PermisoResponse[]>(SEG_END_POINTS.V1.PERMISOS).pipe(
        map((response) => permisoResponseToCollection((response as any).permisos)),
        tap((permisos) => {
          this._permisos.next(this._permisos.value.concat(...permisos));
        }),
      ),
    );
  }

  public observable(): Observable<Permiso[]> {
    return this._permisos$;
  }
}
