import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaEncuestaPayload } from '@encuestas/application/payloads';
import { Encuestado } from '@encuestas/domain/entities';
import { firstValueFrom } from 'rxjs';
import { ENCUESTAS_END_POINTS } from '@encuestas/end-points';

@Injectable()
export class EncuestasImpl {
  constructor(private _http: HttpClient) {}

  public async storeRespuestasCaracterizacionHogar(payload: RespuestaEncuestaPayload[]) {
    return firstValueFrom(
      this._http.post<boolean>(
        `${ENCUESTAS_END_POINTS.V1}/caracterizacion-hogar/store-respuestas`,
        payload,
      ),
    );
  }

  public async storeRespuestasCaracterizacionVivienda(
    jefeHogar: Encuestado,
    payload: RespuestaEncuestaPayload[],
  ) {
    return firstValueFrom(
      this._http.post<boolean>(
        `${ENCUESTAS_END_POINTS.V1}/caracterizacion-vivienda/store-respuestas/${jefeHogar.id}`,
        payload,
      ),
    );
  }

  public async storeRespuestasCaracterizacionFamiliar(
    jefeHogar: Encuestado,
    payload: RespuestaEncuestaPayload[],
  ) {
    return firstValueFrom(
      this._http.post<boolean>(
        `${ENCUESTAS_END_POINTS.V1}/caracterizacion-familiar/store-respuestas/${jefeHogar.id}`,
        payload,
      ),
    );
  }
}
