import { useCallback, useEffect, useState } from 'react';
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
  const { registerSuccess } = useAuthActions();

  const navigate = useNavigate();

  const rehydrate = useCallback(async () => {
    try {
      const token = await getToken();
      if (token && !isTokenExpired(token)) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        registerSuccess(payload.sub ?? payload.userId, token);
        navigate('/home');
      } else {
        await removeToken();
      }
    } finally {
      setIsReady(true);
    }
  }, [registerSuccess, navigate]);

  useEffect(() => {
    rehydrate();
  }, [rehydrate]);

  return { isReady };
}
