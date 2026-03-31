import { Reducer } from 'react';
import { authReducer, authInitialState } from './auth';
import { AuthAction, AuthState } from './auth/types';
import { layoutReducer, layoutInitialState } from './layout';
import { LayoutAction, LayoutState } from './layout/types';

export interface AppState {
  auth: AuthState;
  layout: LayoutState;
}

export type AppAction = AuthAction | LayoutAction;

export const appInitialState: AppState = {
  auth: authInitialState,
  layout: layoutInitialState,
};

export function appReducer(
  state: AppState = appInitialState,
  action: AppAction,
): AppState {
  return {
    auth: authReducer(state.auth, action as AuthAction),
    layout: layoutReducer(state.layout, action as LayoutAction),
  };
}

export type AppReducer = Reducer<AppState, AppAction>;
