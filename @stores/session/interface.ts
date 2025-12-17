import { TokCreAndExpInfoI, UserDataFromTokenI } from '@common/models';

export interface SessionI {
  token: TokCreAndExpInfoI;
  user: UserDataFromTokenI;
  authorities: string[];
  passWasResetted: boolean;
  wasLoaded: boolean;
}
