import { useCallback } from 'react';
import { useAppDispatch } from '@/state-management/providerHooks';
import { loginAsyncAction, logoutAsyncAction, registerAsyncAction } from '@/state-management/auth/asyncActions';

export function useAuthAsyncActions() {
  const dispatch = useAppDispatch();

  const login = useCallback(loginAsyncAction(dispatch), [dispatch]);
  const register = useCallback(registerAsyncAction(dispatch), [dispatch]);
  const logout = useCallback(logoutAsyncAction(dispatch), [dispatch]);

  return { login, register, logout };
}
