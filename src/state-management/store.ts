import { Reducer } from 'react';
import { authReducer, authInitialState } from './auth';
import { AuthAction, AuthState } from './auth/types';

export interface AppState {
  auth: AuthState;
}

export type AppAction = AuthAction;

export const appInitialState: AppState = {
  auth: authInitialState,
};

export function appReducer(state: AppState = appInitialState, action: AppAction): AppState {
  return {
    auth: authReducer(state.auth, action as AuthAction),
  };
}

export type AppReducer = Reducer<AppState, AppAction>;
