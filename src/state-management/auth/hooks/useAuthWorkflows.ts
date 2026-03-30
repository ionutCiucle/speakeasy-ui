import { useCallback } from 'react';
import { useAppDispatch } from '@/state-management/providerHooks';
import { AuthAPI, saveToken } from '@/services';
import { AuthActionType } from '../enums';
import { useAuthAsyncActions } from './useAuthAsyncActions';

interface LoginResponse {
  token: string;
  user: { id: string; email: string };
}

export function useAuthWorkflows() {
  const dispatch = useAppDispatch();
  const { register } = useAuthAsyncActions();

  const registerAndLogin = useCallback(
    async ({
      email,
      password,
      username,
    }: {
      email: string;
      password: string;
      username: string;
    }) => {
      const registered = await register({ email, password, username });
      if (!registered) {
        return false;
      }
      try {
        const { data } = await AuthAPI.post<LoginResponse>('/login', {
          email,
          password,
        });
        await saveToken(data.token);
        dispatch({
          type: AuthActionType.LoginSuccess,
          payload: { userId: data.user.id, token: data.token },
        });
        return true;
      } catch {
        return false;
      }
    },
    [register, dispatch],
  );

  return { registerAndLogin };
}
