import { Injectable } from '@angular/core';
import { RespuestaEncuestaPayload } from '@encuestas/application/payloads';
import { Encuestado } from '@encuestas/domain/entities';
import { EncuestasImpl } from '@encuestas/infrastructure/services';
import { Either } from '@kato-lee/utilities';

type Result1 = Either<string, boolean>;

@Injectable()
export class EncuestaController {
  constructor(private _encuestas: EncuestasImpl) {}

  public async storeRespuestasCaracterizacionHogar(
    payload: RespuestaEncuestaPayload[],
  ): Promise<Result1> {
    try {
      const result = await this._encuestas.storeRespuestasCaracterizacionHogar(payload);
      return Either.right(result);
    } catch (error) {
      return Either.left(error);
    }
  }

  public async storeRespuestasCaracterizacionVivienda(
    jefeHogar: Encuestado,
    payload: RespuestaEncuestaPayload[],
  ): Promise<Result1> {
    try {
      const result = await this._encuestas.storeRespuestasCaracterizacionVivienda(
        jefeHogar,
        payload,
      );
      return Either.right(result);
    } catch (error) {
      return Either.left(error);
    }
  }

  public async storeRespuestasCaracterizacionFamiliar(
    jefeHogar: Encuestado,
    payload: RespuestaEncuestaPayload[],
  ): Promise<Result1> {
    try {
      const result = await this._encuestas.storeRespuestasCaracterizacionFamiliar(
        jefeHogar,
        payload,
      );
      return Either.right(result);
    } catch (error) {
      return Either.left(error);
    }
  }
}
