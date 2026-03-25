import { useCallback } from 'react';
import { useAppDispatch } from '../../providerHooks';
import { AuthActionType } from '../enums';

export function useAuthActions() {
  const dispatch = useAppDispatch();

  const setUsername = useCallback(
    (username: string) => {
      dispatch({ type: AuthActionType.SetUsername, payload: username });
    },
    [dispatch],
  );

  return { setUsername };
}
