import { useState, useCallback, useEffect } from 'react';
import { TabAPI } from '@/services';
import type { TabDTO } from '../dto';

export function useTabDetails(tabId: string) {
  const [tab, setTab] = useState<TabDTO | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTabDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await TabAPI.get<TabDTO>(`/${tabId}`);
      setTab(data);
    } catch (err) {
      console.error('[useTabDetails] Failed to load tab:', err);
      setError('Failed to load tab details');
    } finally {
      setIsLoading(false);
    }
  }, [tabId]);

  useEffect(() => {
    fetchTabDetails();
  }, [fetchTabDetails]);

  return { tab, isLoading, error };
}
