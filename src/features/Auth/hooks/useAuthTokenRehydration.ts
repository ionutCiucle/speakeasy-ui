import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-native';
import { getToken, removeToken } from '@/services';
import { useAuthActions } from '@/state-management/auth';

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function useAuthTokenRehydration() {
  const [isReady, setIsReady] = useState(false);
  const { loginSuccess } = useAuthActions();

  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  const rehydrate = useCallback(async () => {
    try {
      const token = await getToken();
      if (token && !isTokenExpired(token)) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        loginSuccess(payload.sub ?? payload.userId, token, payload.email ?? '');
        navigateRef.current('/home');
      } else {
        await removeToken();
      }
    } finally {
      setIsReady(true);
    }
  }, [loginSuccess]);

  useEffect(() => {
    rehydrate();
  }, [rehydrate]);

  return { isReady };
}
