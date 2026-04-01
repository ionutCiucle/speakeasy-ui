import { useCallback } from 'react';
import { useAppDispatch } from '@/state-management/providerHooks';
import { CreateTabActionType } from '@/state-management/create-tab/enums';
import { Member, MenuItem } from '@/state-management/create-tab/types';

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

  const addMember = useCallback(
    (member: Member) => {
      dispatch({ type: CreateTabActionType.AddMember, payload: member });
    },
    [dispatch],
  );

  const removeMember = useCallback(
    (id: string) => {
      dispatch({ type: CreateTabActionType.RemoveMember, payload: id });
    },
    [dispatch],
  );

  const addMenuItem = useCallback(
    (item: MenuItem) => {
      dispatch({ type: CreateTabActionType.AddMenuItem, payload: item });
    },
    [dispatch],
  );

  const removeMenuItem = useCallback(
    (id: string) => {
      dispatch({ type: CreateTabActionType.RemoveMenuItem, payload: id });
    },
    [dispatch],
  );

  const reset = useCallback(() => {
    dispatch({ type: CreateTabActionType.Reset });
  }, [dispatch]);

  return {
    setTabName,
    setVenue,
    setCurrency,
    setNotes,
    addMember,
    removeMember,
    addMenuItem,
    removeMenuItem,
    reset,
  };
}
