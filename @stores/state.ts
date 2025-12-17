import { ActionReducerMap } from '@ngrx/store';
import { SessionI, sessionReducer } from './session';

export interface AppState {
  session: SessionI;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  session: sessionReducer,
};
