import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, retry, throwError, timeout } from 'rxjs';
import { setSession, sessionState, sessionInitialState } from './store';
import { STORAGE_KEYS } from '@common/constants';
import { STORE_END_POINTS } from '@stores/end-points';
import { Session } from './entity';
import { TokCreAndExpInfo, UserDataFromToken } from '@common/models';
import { decodeToken } from '@common/services/decode-token';

interface AuthDataI {
  documento: string;
  nombreCompleto: string;
  permisos: string[];
}

@Injectable({ providedIn: 'root' })
export class SessionStore {
  constructor(
    private store: Store<Session>,
    private _http: HttpClient,
  ) {}

  public dispatch(session: { token: string; authorities: string[]; authData: AuthDataI }): void {
    const tokenDecoded = decodeToken(session.token);

    const newSession = new Session(
      new TokCreAndExpInfo(tokenDecoded.createdAt, tokenDecoded.expiredAt),
      new UserDataFromToken(
        tokenDecoded.user.id,
        tokenDecoded.user.document,
        session.authData.nombreCompleto,
      ),
      session.authorities,
      tokenDecoded.passWasResetted,
      true,
    );

    this.store.dispatch(setSession({ data: newSession }));
  }

  public clear(): void {
    this.store.dispatch(
      setSession({
        data: sessionInitialState,
      }),
    );
  }

  public observable(): Observable<Session> {
    return this.store.select(sessionState as any);
  }

  public async autoInstance(): Promise<void> {
    let wasLoaded = true;

    const subs = this.observable().subscribe((el) => {
      if (!el.wasLoaded) wasLoaded = false;
    });
    subs.unsubscribe();

    if (!wasLoaded) {
      try {
        const token = localStorage.getItem(STORAGE_KEYS.authToken) || '';
        let authorities: string[] = [];

        const authData = await this._fetchMyAuthData();
        authorities = authData.permisos;

        this.dispatch({
          token,
          authorities,
          authData,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  private _fetchMyAuthData(): Promise<AuthDataI> {
    return firstValueFrom(
      this._http.get<AuthDataI>(STORE_END_POINTS.V1.CONFIG.MY_AUTH_DATA).pipe(
        timeout({
          each: 10000,
          with: () => throwError(() => {}),
        }),
        retry(3),
      ),
    );
  }
}
