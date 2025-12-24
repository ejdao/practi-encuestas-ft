import { Injectable } from '@angular/core';
import { FetchContextsService } from '@seguridad/auth/application/services';
import { Either } from '@kato-lee/utilities';
import { CtmType } from '@common/types';

type Result = Either<string, CtmType<string>[]>;

@Injectable()
export class FetchContextsController {
  constructor(private _fetchContexts: FetchContextsService) {}

  public async execute(): Promise<Result> {
    try {
      const result = await this._fetchContexts.execute();
      return Either.right(result);
    } catch (error) {
      return Either.left(error);
    }
  }
}
