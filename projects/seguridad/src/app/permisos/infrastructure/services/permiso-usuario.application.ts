import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { PermisoResponse } from '../data-transfers';
import { PermisoUsuarioService } from '@seguridad/permisos/application/services';
import { Permiso, Usuario } from '@seguridad/permisos/domain/entities';
import { SEG_END_POINTS } from '@seguridad/end-points';

@Injectable({ providedIn: 'root' })
export class PermisoUsuarioApplication implements PermisoUsuarioService {
  constructor(private _http: HttpClient) {}

  public addPermiso(permiso: Permiso, usuario: Usuario): Promise<boolean> {
    return firstValueFrom(
      this._http
        .get<PermisoResponse>(
          `${SEG_END_POINTS.V1.PERMISOS}/add-permiso-to-usuario/${permiso.id}/${usuario.id}`,
        )
        .pipe(
          map((response) => {
            if (response) return true;
            else return false;
          }),
        ),
    );
  }

  public removePermiso(permiso: Permiso, usuario: Usuario): Promise<boolean> {
    return firstValueFrom(
      this._http.get<boolean>(
        `${SEG_END_POINTS.V1.PERMISOS}/remove-permiso-to-usuario/${permiso.id}/${usuario.id}`,
      ),
    );
  }
}
