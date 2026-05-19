import { useCallback } from 'react';
import { useAppDispatch } from '@/state-management/providerHooks';
import { LayoutActionType, ModalId } from '@/state-management/layout/enums';
import type { AddItemsModalPayload } from '@/state-management/layout/types';

export function useLayoutActions() {
  const dispatch = useAppDispatch();

  const showModal = useCallback(
    (modalId: ModalId, payload?: AddItemsModalPayload) => {
      dispatch({
        type: LayoutActionType.ShowModal,
        payload: modalId,
        modalPayload: payload,
      });
    },
    [dispatch],
  );

  const hideModal = useCallback(() => {
    dispatch({ type: LayoutActionType.HideModal });
  }, [dispatch]);

  return { showModal, hideModal };
}
