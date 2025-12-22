import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { permisoResponseToCollection } from '../factories';
import { firstValueFrom, map, Observable, tap } from 'rxjs';
import { PermisoRepository } from '@seguridad/permisos/domain/repositories';
import { Permiso } from '@seguridad/permisos/domain/entities';
import { SEG_END_POINTS } from '@seguridad/end-points';
import { permisosObs$, permisosSubj } from './_stores';
import { PermisoResponse } from '../data-transfers';
import { DataStoredI } from '@common/models';

@Injectable()
export class PermisoProxyRepository implements PermisoRepository {
  constructor(private _http: HttpClient) {}

  public async fetch(refresh = false): Promise<Permiso[]> {
    if (permisosSubj.value.updatedAt && !refresh) return permisosSubj.value.data;

    return firstValueFrom(
      this._http.get<PermisoResponse[]>(SEG_END_POINTS.V1.PERMISOS).pipe(
        map((response) => permisoResponseToCollection((response as any).permisos)),
        tap((permisos) => {
          permisosSubj.next(
            new DataStoredI(permisosSubj.value.data.concat(...permisos), new Date()),
          );
        }),
      ),
    );
  }

  public observable(): Observable<DataStoredI<Permiso>> {
    return permisosObs$;
  }
}
