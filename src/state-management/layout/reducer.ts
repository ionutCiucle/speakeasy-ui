import { LayoutAction, LayoutState } from './types';
import { LayoutActionType } from './enums';

export const layoutInitialState: LayoutState = {
  activeModal: null,
};

export function layoutReducer(
  state: LayoutState = layoutInitialState,
  action: LayoutAction,
): LayoutState {
  switch (action.type) {
    case LayoutActionType.ShowModal:
      return { ...state, activeModal: action.payload };
    case LayoutActionType.HideModal:
      return { ...state, activeModal: null };
    default:
      return state;
  }
}
