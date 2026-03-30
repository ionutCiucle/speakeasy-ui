import { useCallback } from 'react';
import { useAppDispatch } from '@/state-management/providerHooks';
import { AuthActionType } from '@/state-management/auth/enums';

export function useAuthActions() {
  const dispatch = useAppDispatch();

  const setUsername = useCallback(
    (username: string) => {
      dispatch({ type: AuthActionType.SetUsername, payload: username });
    },
    [dispatch],
  );

  const registerSuccess = useCallback(() => {
    dispatch({ type: AuthActionType.RegisterSuccess });
  }, [dispatch]);

  const registerFailure = useCallback(() => {
    dispatch({ type: AuthActionType.RegisterFailure });
  }, [dispatch]);

  const loginSuccess = useCallback(
    (userId: string, token: string, email: string) => {
      dispatch({
        type: AuthActionType.LoginSuccess,
        payload: { userId, token, email },
      });
    },
    [dispatch],
  );

  const loginFailure = useCallback(() => {
    dispatch({ type: AuthActionType.LoginFailure });
  }, [dispatch]);

  return {
    setUsername,
    registerSuccess,
    registerFailure,
    loginSuccess,
    loginFailure,
  };
}
