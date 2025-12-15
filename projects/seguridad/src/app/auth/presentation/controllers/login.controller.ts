import { Injectable } from '@angular/core';
import { LoginI } from '@seguridad/auth/domain/models';
import { LoginPayload } from '@seguridad/auth/application/payloads';
import { LoginService } from '@seguridad/auth/application/services';
import { Either } from '@kato-lee/utilities';

type Result = Either<string, LoginI>;

@Injectable()
export class LoginController {
  constructor(private _service: LoginService) {}

  public async execute(payload: LoginPayload, fromMobile = false): Promise<Result> {
    try {
      const result = await this._service.execute(payload, fromMobile);
      return Either.right(result);
    } catch (error) {
      return Either.left(error);
    }
  }
}
