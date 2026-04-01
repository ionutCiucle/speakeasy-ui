import { useCallback } from 'react';
import { useAppDispatch } from '@/state-management/providerHooks';
import { LayoutActionType, ModalId } from '@/state-management/layout/enums';

export function useLayoutActions() {
  const dispatch = useAppDispatch();

  const showModal = useCallback(
    (modalId: ModalId) => {
      dispatch({ type: LayoutActionType.ShowModal, payload: modalId });
    },
    [dispatch],
  );

  const hideModal = useCallback(() => {
    dispatch({ type: LayoutActionType.HideModal });
  }, [dispatch]);

  return { showModal, hideModal };
}
