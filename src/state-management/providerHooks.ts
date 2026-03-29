import { useContext, useRef } from 'react';
import { AppStateContext, AppDispatchContext } from '@/state-management/Provider';
import { AppState, AppAction } from '@/state-management/store';

export function useAppDispatch(): React.Dispatch<AppAction> {
  return useContext(AppDispatchContext);
}

export function useAppSelector<T>(selector: (state: AppState) => T): T {
  const state = useContext(AppStateContext);
  const selected = selector(state);

  const ref = useRef<T>(selected);

  if (JSON.stringify(ref.current) !== JSON.stringify(selected)) {
    ref.current = selected;
  }

  return ref.current;
}
