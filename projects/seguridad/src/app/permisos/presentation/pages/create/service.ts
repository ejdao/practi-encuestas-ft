import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SEG_END_POINTS } from '@seguridad/end-points';

export interface ModuleI {
  id: string;
  code: string;
  name: string;
}

@Injectable()
export class CreateAuthoritiesServices {
  constructor(private _http: HttpClient) {}

  public createModule(nombre: string): Promise<boolean> {
    return firstValueFrom(this._http.post<boolean>(`${SEG_END_POINTS.V1.MODULOS}`, { nombre }));
  }

  public createSubModule(nombre: string, moduloId: string): Promise<boolean> {
    return firstValueFrom(
      this._http.post<boolean>(`${SEG_END_POINTS.V1.SUBMODULOS}`, {
        nombre,
        moduloId,
      }),
    );
  }

  public createAuthority(
    nombre: string,
    moduloId?: string,
    subModuloId?: string,
  ): Promise<boolean> {
    return firstValueFrom(
      this._http.post<boolean>(`${SEG_END_POINTS.V1.PERMISOS}`, {
        nombre,
        moduloId,
        subModuloId,
      }),
    );
  }
}
