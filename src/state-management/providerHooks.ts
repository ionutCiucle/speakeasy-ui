import { useContext, useRef } from 'react';
import {
  AppStateContext,
  AppDispatchContext,
} from '@/state-management/Provider';
import { AppState, AppAction } from '@/state-management/store';

export function useAppDispatch(): React.Dispatch<AppAction> {
  const dispatch = useContext(AppDispatchContext);
  if (!dispatch) {
    const message = 'useAppDispatch() must be used within <AppProvider/>';
    console.error(message);
    throw new Error(message);
  }
  return dispatch;
}

export function useAppSelector<T>(selector: (state: AppState) => T): T {
  const state = useContext(AppStateContext);
  if (!state) {
    const message = 'useAppSelector() must be used within <AppProvider/>';
    console.error(message);
    throw new Error(message);
  }
  const selected = selector(state);

  const ref = useRef<T>(selected);

  if (JSON.stringify(ref.current) !== JSON.stringify(selected)) {
    ref.current = selected;
  }

  return ref.current;
}
