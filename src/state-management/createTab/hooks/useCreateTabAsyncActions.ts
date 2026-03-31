import { useCallback } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '@/state-management/providerHooks';
import { createTabAsyncAction } from '@/state-management/createTab/asyncActions';

export function useCreateTabAsyncActions() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
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
        menuItems,
        token: token ?? '',
      }),
    [dispatch, token, tabName, venue, currency, notes, members, menuItems],
  );

  return { submitCreateTab };
}
