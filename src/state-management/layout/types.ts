import { LayoutActionType, ModalId } from './enums';

export interface AddItemsModalPayload {
  tabId: string;
  existingMenuItems: { name: string; price: number }[];
}

export interface LayoutState {
  activeModal: ModalId | null;
  modalPayload: AddItemsModalPayload | null;
}

export interface ShowModalAction {
  type: LayoutActionType.ShowModal;
  payload: ModalId;
  modalPayload?: AddItemsModalPayload;
}

export interface HideModalAction {
  type: LayoutActionType.HideModal;
}

export type LayoutAction = ShowModalAction | HideModalAction;
