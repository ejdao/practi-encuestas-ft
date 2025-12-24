import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map, Observable, tap } from 'rxjs';
import { RolRepository } from '@seguridad/permisos/domain/repositories';
import { Rol } from '@seguridad/permisos/domain/entities';
import { SEG_END_POINTS } from '@seguridad/end-points';
import { dataToRol } from '../factories/rol.factory';
import { rolesObs$, rolesSubj } from './_stores';
import { DataStoredI } from '@common/models';
import { RolRes } from '../data-transfers';

@Injectable()
export class RolProxyRepository implements RolRepository {
  constructor(private _http: HttpClient) {}

  public async fetch(refresh = false): Promise<Rol[]> {
    if (rolesSubj.value.updatedAt && !refresh) return rolesSubj.value.data;

    return firstValueFrom(
      this._http
        .get<RolRes[]>(SEG_END_POINTS.V1.ROLES, {
          params: {
            addComplements: true,
          },
        })
        .pipe(
          map((response) => dataToRol(response)),
          tap((roles) => {
            rolesSubj.next(new DataStoredI(roles, new Date()));
          }),
        ),
    );
  }

  public observable(): Observable<DataStoredI<Rol>> {
    return rolesObs$;
  }
}
