import { useCallback } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '@/state-management/providerHooks';
import {
  updateTabMenuItemsAsyncAction,
  updateMemberItemsAsyncAction,
} from '@/state-management/tabs/asyncActions';

export function useTabAsyncActions() {
  const dispatch = useAppDispatch();
  const isUpdatingMenuItems = useAppSelector(
    (state) => state.tabs.isUpdatingMenuItems,
  );
  const isUpdatingMemberItems = useAppSelector(
    (state) => state.tabs.isUpdatingMemberItems,
  );

  const updateMenuItems = useCallback(
    (tabId: string, menuItems: { name: string; price: number }[]) =>
      updateTabMenuItemsAsyncAction(dispatch)(tabId, menuItems),
    [dispatch],
  );

  const updateMemberItems = useCallback(
    (
      tabId: string,
      userId: string,
      items: { menuItemId: string; quantity: number }[],
    ) => updateMemberItemsAsyncAction(dispatch)(tabId, userId, items),
    [dispatch],
  );

  return {
    updateMenuItems,
    isUpdatingMenuItems,
    updateMemberItems,
    isUpdatingMemberItems,
  };
}
