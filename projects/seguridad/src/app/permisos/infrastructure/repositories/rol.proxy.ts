import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, map, Observable, tap } from 'rxjs';
import { dataToRol } from '../factories/rol.factory';
import { RolRes } from '../data-transfers';
import { RolRepository } from '@seguridad/permisos/domain/repositories';
import { Rol } from '@seguridad/permisos/domain/entities';
import { SEG_END_POINTS } from '@seguridad/end-points';

@Injectable()
export class RolProxyRepository implements RolRepository {
  constructor(private _http: HttpClient) {}

  private _roles = new BehaviorSubject<Rol[]>([]);
  private _roles$ = this._roles.asObservable();

  public async fetch(refresh = false): Promise<Rol[]> {
    if (!refresh && this._roles.value.length) return this._roles.value;

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
            this._roles.next(roles);
          }),
        ),
    );
  }

  public observable(): Observable<Rol[]> {
    return this._roles$;
  }
}
