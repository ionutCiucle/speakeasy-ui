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

  const registerSuccess = useCallback(
    (userId: string, token: string) => {
      dispatch({ type: AuthActionType.RegisterSuccess, payload: { userId, token } });
    },
    [dispatch],
  );

  const registerFailure = useCallback(() => {
    dispatch({ type: AuthActionType.RegisterFailure });
  }, [dispatch]);

  const loginSuccess = useCallback(
    (userId: string, token: string) => {
      dispatch({ type: AuthActionType.LoginSuccess, payload: { userId, token } });
    },
    [dispatch],
  );

  const loginFailure = useCallback(() => {
    dispatch({ type: AuthActionType.LoginFailure });
  }, [dispatch]);

  return { setUsername, registerSuccess, registerFailure, loginSuccess, loginFailure };
}
