import { useState, useCallback, useEffect } from 'react';
import { TabAPI } from '@/services';
import type { TabDTO } from '../dto';

export function useTabs() {
  const [tabs, setTabs] = useState<TabDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTabs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await TabAPI.get<TabDTO[]>('/');
      setTabs(data);
    } catch (err) {
      console.error('[useTabs] Failed to load tabs:', err);
      setError('Failed to load tabs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTabs();
  }, [fetchTabs]);

  return { tabs, isLoading, error };
}
