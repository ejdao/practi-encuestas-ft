import { LoginI } from '@seguridad/auth/domain/models';
import { LoginPayload } from '../payloads';

export abstract class LoginService {
  abstract execute(payload: LoginPayload, fromMobile: boolean): Promise<LoginI>;
}
