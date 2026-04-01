import { useCallback } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '@/state-management/providerHooks';
import { createTabAsyncAction } from '@/state-management/create-tab/asyncActions';

export function useCreateTabAsyncActions() {
  const dispatch = useAppDispatch();
  const { tabName, venue, currency, notes, members, menuItems } =
    useAppSelector((state) => state.createTab);

  const submitCreateTab = useCallback(
    () =>
      createTabAsyncAction(dispatch)({
        title: tabName,
        venue,
        currency,
        notes,
        members,
        menuItems: menuItems.map(({ name, price }) => ({ name, price })),
      }),
    [dispatch, tabName, venue, currency, notes, members, menuItems],
  );

  return { submitCreateTab };
}
