import { useCallback } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '@/state-management/providerHooks';
import { updateTabMenuItemsAsyncAction } from '@/state-management/tabs/asyncActions';

export function useTabAsyncActions() {
  const dispatch = useAppDispatch();
  const isUpdatingMenuItems = useAppSelector(
    (state) => state.tabs.isUpdatingMenuItems,
  );

  const updateMenuItems = useCallback(
    (tabId: string, menuItems: { name: string; price: number }[]) =>
      updateTabMenuItemsAsyncAction(dispatch)(tabId, menuItems),
    [dispatch],
  );

  return { updateMenuItems, isUpdatingMenuItems };
}
