import { Injectable } from '@angular/core';
import { FetchEncuestadosPayload } from '@encuestas/application/payloads';
import { EncuestadoCrudSource } from '@encuestas/infrastructure/repositories';
import { Encuestado } from '@encuestas/domain/entities';
import { Either } from '@kato-lee/utilities';
import { DataStoredI } from '@common/models';
import { Observable } from 'rxjs';

type Result1 = Either<string, Encuestado[]>;

@Injectable()
export class EncuestadoCrudController {
  constructor(private _crud: EncuestadoCrudSource) {}

  public async fetch(payload: FetchEncuestadosPayload, refresh: boolean): Promise<Result1> {
    try {
      const result = await this._crud.fetch(payload, refresh);
      return Either.right(result);
    } catch (error) {
      return Either.left(error);
    }
  }

  public observable(): Observable<DataStoredI<Encuestado>> {
    return this._crud.observable();
  }
}
