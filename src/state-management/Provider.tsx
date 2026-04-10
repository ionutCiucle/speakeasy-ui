import React, { createContext, useReducer, ReactNode } from 'react';
import {
  appReducer,
  appInitialState,
  AppState,
  AppAction,
} from '@/state-management/store';
import { createLoggerReducer } from '@/state-management/loggerMiddleware';

export const AppStateContext = createContext<AppState>(undefined!);
export const AppDispatchContext = createContext<React.Dispatch<AppAction>>(
  undefined!,
);

interface AppProviderProps {
  children: ReactNode;
}

const loggedReducer = createLoggerReducer(appReducer);

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(loggedReducer, appInitialState);

  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
}
