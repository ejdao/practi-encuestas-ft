import { Injectable } from '@angular/core';
import { Encuesta } from '@encuestas/domain/entities';
import { FormatoImpl } from '@encuestas/infrastructure/services';
import { Either } from '@kato-lee/utilities';

type Result1 = Either<string, Encuesta>;

@Injectable()
export class FormatoController {
  constructor(private _formatos: FormatoImpl) {}

  public async generar(formatoId: number): Promise<Result1> {
    try {
      const result = await this._formatos.generar(formatoId);
      return Either.right(result);
    } catch (error) {
      return Either.left(error);
    }
  }
}
