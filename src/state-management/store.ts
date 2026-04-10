import { Reducer } from 'react';
import { authReducer, authInitialState } from './auth';
import { AuthAction, AuthState } from './auth/types';
import { layoutReducer, layoutInitialState } from './layout';
import { LayoutAction, LayoutState } from './layout/types';
import { createTabReducer, createTabInitialState } from './create-tab';
import { CreateTabAction, CreateTabState } from './create-tab/types';
import { tabsReducer, tabsInitialState } from './tabs';
import { TabsAction, TabsState } from './tabs/types';

export interface AppState {
  auth: AuthState;
  layout: LayoutState;
  createTab: CreateTabState;
  tabs: TabsState;
}

export type AppAction =
  | AuthAction
  | LayoutAction
  | CreateTabAction
  | TabsAction;

export const appInitialState: AppState = {
  auth: authInitialState,
  layout: layoutInitialState,
  createTab: createTabInitialState,
  tabs: tabsInitialState,
};

export function appReducer(
  state: AppState = appInitialState,
  action: AppAction,
): AppState {
  return {
    auth: authReducer(state.auth, action as AuthAction),
    layout: layoutReducer(state.layout, action as LayoutAction),
    createTab: createTabReducer(state.createTab, action as CreateTabAction),
    tabs: tabsReducer(state.tabs, action as TabsAction),
  };
}

export type AppReducer = Reducer<AppState, AppAction>;
