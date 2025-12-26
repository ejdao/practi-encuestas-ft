import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { encuestaResToEncuestaFactory } from '../factories';
import { ENCUESTAS_END_POINTS } from '@encuestas/end-points';
import { EncuestaRes } from '../responses';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class FormatoImpl {
  constructor(private _http: HttpClient) {}

  public async generar(formatoId: number) {
    return firstValueFrom(
      this._http
        .get<EncuestaRes>(`${ENCUESTAS_END_POINTS.V1}/generar/${formatoId}`)
        .pipe(map((r) => encuestaResToEncuestaFactory(r))),
    );
  }
}
