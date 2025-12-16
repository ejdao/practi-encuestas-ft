import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { Session } from './entity';
import { AppState } from '../state';
import { TokCreAndExpInfo, UserDataFromToken } from '@common/models';

export const setSession = createAction('[Session] Set session', props<{ data: Session }>());
export const sessionFeatureKey = 'session';
export const sessionInitialState: Session = new Session(
  new TokCreAndExpInfo(new Date(), new Date()),
  new UserDataFromToken('', '', ''),
  [],
  false,
  false,
);

export const sessionReducer = createReducer(
  sessionInitialState,
  on(setSession, (_state, { data }) => data),
);

export const selectSession = (state: AppState) => Object.freeze(state.session);
export const sessionState = createSelector(selectSession, (state) => state);
