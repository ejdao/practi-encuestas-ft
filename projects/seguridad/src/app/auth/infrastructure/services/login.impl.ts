import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LoginService } from '@seguridad/auth/application/services';
import { LoginPayload } from '@seguridad/auth/application/payloads';
import { LoginI } from '@seguridad/auth/domain/models';
import { environment } from '@environments/environment';
import { LoginRes } from '../responses';

const encryptPass = (val: string) => val;

@Injectable()
export class LoginImpl implements LoginService {
  constructor(private _http: HttpClient) {}

  public async execute(payload: LoginPayload, fromMobile: boolean): Promise<LoginI> {
    payload.password = encryptPass(payload.password);
    payload.username = encryptPass(payload.username);
    (payload as any).context = 'DEFAULT';

    return firstValueFrom(
      this._http.post<LoginRes>(`${environment.apiUrlGen}/auth/login`, payload, {
        params: { fromMobile },
      }),
    );
  }
}
