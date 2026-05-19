import { LayoutAction, LayoutState } from './types';
import { LayoutActionType } from './enums';

export const layoutInitialState: LayoutState = {
  activeModal: null,
  modalPayload: null,
};

export function layoutReducer(
  state: LayoutState = layoutInitialState,
  action: LayoutAction,
): LayoutState {
  switch (action.type) {
    case LayoutActionType.ShowModal: {
      return {
        ...state,
        activeModal: action.payload,
        modalPayload: action.modalPayload ?? null,
      };
    }
    case LayoutActionType.HideModal: {
      return { ...state, activeModal: null, modalPayload: null };
    }
    default: {
      return state;
    }
  }
}
