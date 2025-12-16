import { TokCreAndExpInfo, UserDataFromToken } from '@common/models';

export class Session {
  constructor(
    private _token: TokCreAndExpInfo,
    private _user: UserDataFromToken,
    private _authorities: string[],
    private _passWasResetted: boolean,
    private _wasLoaded: boolean,
  ) {}

  get token(): TokCreAndExpInfo {
    return this._token;
  }

  get user(): UserDataFromToken {
    return this._user;
  }

  get passWasResetted(): boolean {
    return this._passWasResetted;
  }

  get authorities(): string[] {
    return this._authorities;
  }

  get wasLoaded(): boolean {
    return this._wasLoaded;
  }
}
