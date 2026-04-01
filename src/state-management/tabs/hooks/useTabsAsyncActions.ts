import { useCallback } from 'react';
import { useAppDispatch } from '@/state-management/providerHooks';
import { getTabsAsyncAction } from '@/state-management/tabs/asyncActions';

export function useTabsAsyncActions() {
  const dispatch = useAppDispatch();

  const getTabs = useCallback(() => getTabsAsyncAction(dispatch)(), [dispatch]);

  return { getTabs };
}
