import { Reducer } from 'react';
import { authReducer, authInitialState } from './auth';
import { AuthAction, AuthState } from './auth/types';
import { layoutReducer, layoutInitialState } from './layout';
import { LayoutAction, LayoutState } from './layout/types';
import { createTabReducer, createTabInitialState } from './createTab';
import { CreateTabAction, CreateTabState } from './createTab/types';

export interface AppState {
  auth: AuthState;
  layout: LayoutState;
  createTab: CreateTabState;
}

export type AppAction = AuthAction | LayoutAction | CreateTabAction;

export const appInitialState: AppState = {
  auth: authInitialState,
  layout: layoutInitialState,
  createTab: createTabInitialState,
};

export function appReducer(
  state: AppState = appInitialState,
  action: AppAction,
): AppState {
  return {
    auth: authReducer(state.auth, action as AuthAction),
    layout: layoutReducer(state.layout, action as LayoutAction),
    createTab: createTabReducer(state.createTab, action as CreateTabAction),
  };
}

export type AppReducer = Reducer<AppState, AppAction>;
