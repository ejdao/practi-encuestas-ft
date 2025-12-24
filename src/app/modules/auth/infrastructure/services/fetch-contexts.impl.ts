import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, retry, throwError, timeout } from 'rxjs';
import { FetchContextsService } from '@seguridad/auth/application/services';
import { SEG_END_POINTS } from '@seguridad/end-points';
import { CtmType } from '@common/types';

@Injectable()
export class FetchContextsImpl implements FetchContextsService {
  constructor(private _http: HttpClient) {}

  public execute(): Promise<CtmType<string>[]> {
    return firstValueFrom(
      this._http.get<CtmType<string>[]>(`${SEG_END_POINTS.V1.AUTH}/contextos`).pipe(
        timeout({
          each: 5000,
          with: () => throwError(() => {}),
        }),
        retry(3),
      ),
    );
  }
}
