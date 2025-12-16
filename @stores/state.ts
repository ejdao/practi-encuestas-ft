import { ActionReducerMap } from '@ngrx/store';
import { Session, sessionReducer } from './session';

export interface AppState {
  session: Session;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  session: sessionReducer,
};
