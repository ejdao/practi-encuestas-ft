import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { setSession, sessionState, sessionInitialState } from './store';
import { decodeToken } from '@common/services/decode-token';
import { STORE_END_POINTS } from '@stores/end-points';
import { STORAGE_KEYS } from '@common/constants';
import { SessionI } from './interface';

interface AuthDataI {
  documento: string;
  nombreCompleto: string;
  permisos: string[];
}

@Injectable({ providedIn: 'root' })
export class SessionStore {
  constructor(
    private store: Store<SessionI>,
    private _http: HttpClient,
    private _router: Router,
  ) {}

  public dispatch(session: { token: string; authorities: string[]; authData: AuthDataI }): void {
    const tokenDecoded = decodeToken(session.token);

    const newSession: SessionI = {
      token: {
        createdAt: tokenDecoded.createdAt,
        expiredAt: tokenDecoded.expiredAt,
      },
      user: {
        id: tokenDecoded.user.id,
        document: tokenDecoded.user.document,
        fullName: session.authData.nombreCompleto,
      },
      authorities: session.authorities,
      passWasResetted: tokenDecoded.passWasResetted,
      wasLoaded: true,
    };

    this.store.dispatch(setSession({ data: newSession }));
  }

  public clear(): void {
    this.store.dispatch(
      setSession({
        data: sessionInitialState,
      }),
    );
  }

  public observable(): Observable<SessionI> {
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
      } catch (error: any) {
        throw new Error(error);
      }
    }
  }

  private _fetchMyAuthData(): Promise<AuthDataI> {
    return firstValueFrom(this._http.get<AuthDataI>(STORE_END_POINTS.V1.CONFIG.MY_AUTH_DATA));
  }
}
