import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { SessionI } from './interface';
import { AppState } from '../state';

export const setSession = createAction('[Session] Set session', props<{ data: SessionI }>());
export const sessionFeatureKey = 'session';
export const sessionInitialState: SessionI = {
  token: {
    createdAt: new Date(),
    expiredAt: new Date(),
  },
  user: {
    id: '',
    document: '',
    fullName: '',
  },
  authorities: [],
  passWasResetted: false,
  wasLoaded: false,
};

export const sessionReducer = createReducer(
  sessionInitialState,
  on(setSession, (_state, { data }) => data),
);

export const selectSession = (state: AppState) => Object.freeze(state.session);
export const sessionState = createSelector(selectSession, (state) => state);
