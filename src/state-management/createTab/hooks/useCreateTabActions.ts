import { useCallback } from 'react';
import { useAppDispatch } from '@/state-management/providerHooks';
import { CreateTabActionType } from '@/state-management/createTab/enums';

export function useCreateTabActions() {
  const dispatch = useAppDispatch();

  const setTabName = useCallback(
    (tabName: string) => {
      dispatch({ type: CreateTabActionType.SetTabName, payload: tabName });
    },
    [dispatch],
  );

  const setVenue = useCallback(
    (venue: string) => {
      dispatch({ type: CreateTabActionType.SetVenue, payload: venue });
    },
    [dispatch],
  );

  const setCurrency = useCallback(
    (code: string, name: string) => {
      dispatch({
        type: CreateTabActionType.SetCurrency,
        payload: { code, name },
      });
    },
    [dispatch],
  );

  const setNotes = useCallback(
    (notes: string) => {
      dispatch({ type: CreateTabActionType.SetNotes, payload: notes });
    },
    [dispatch],
  );

  return { setTabName, setVenue, setCurrency, setNotes };
}
