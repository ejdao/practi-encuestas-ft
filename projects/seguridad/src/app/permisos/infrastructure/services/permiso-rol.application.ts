import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { PermisoResponse } from '../data-transfers';
import { PermisoRolService } from '@seguridad/permisos/application/services';
import { Permiso, Rol } from '@seguridad/permisos/domain/entities';
import { SEG_END_POINTS } from '@seguridad/end-points';

@Injectable({ providedIn: 'root' })
export class PermisoRolApplication implements PermisoRolService {
  constructor(private _http: HttpClient) {}

  public add(permiso: Permiso, rol: Rol): Promise<boolean> {
    return firstValueFrom(
      this._http
        .get<PermisoResponse>(
          `${SEG_END_POINTS.V1.PERMISOS}/add-permiso-to-rol/${permiso.id}/${rol.id}`,
        )
        .pipe(
          map((response) => {
            if (response) return true;
            else return false;
          }),
        ),
    );
  }

  public remove(permiso: Permiso, rol: Rol): Promise<boolean> {
    return firstValueFrom(
      this._http.get<boolean>(
        `${SEG_END_POINTS.V1.PERMISOS}/remove-permiso-to-rol/${permiso.id}/${rol.id}`,
      ),
    );
  }
}
