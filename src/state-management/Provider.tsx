import React, { createContext, useReducer, ReactNode } from 'react';
import { appReducer, appInitialState, AppState, AppAction } from '@/state-management/store';

export const AppStateContext = createContext<AppState>(appInitialState);
export const AppDispatchContext = createContext<React.Dispatch<AppAction>>(() => undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, appInitialState);

  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
}
