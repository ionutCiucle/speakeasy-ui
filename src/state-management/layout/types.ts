import { LayoutActionType, ModalId } from './enums';

export interface LayoutState {
  activeModal: ModalId | null;
}

export interface ShowModalAction {
  type: LayoutActionType.ShowModal;
  payload: ModalId;
}

export interface HideModalAction {
  type: LayoutActionType.HideModal;
}

export type LayoutAction = ShowModalAction | HideModalAction;
