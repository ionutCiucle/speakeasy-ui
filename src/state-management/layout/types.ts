import { LayoutActionType, ModalId } from './enums';

export interface AddItemsModalPayload {
  tabId: string;
  existingMenuItems: { name: string; price: number }[];
}

export interface EditReceiptTotalsModalPayload {
  currentTotal: number;
  currentTip: number;
  currencyCode: string;
}

export type ModalPayload = AddItemsModalPayload | EditReceiptTotalsModalPayload;

export interface LayoutState {
  activeModal: ModalId | null;
  modalPayload: ModalPayload | null;
}

export interface ShowModalAction {
  type: LayoutActionType.ShowModal;
  payload: ModalId;
  modalPayload?: ModalPayload;
}

export interface HideModalAction {
  type: LayoutActionType.HideModal;
}

export type LayoutAction = ShowModalAction | HideModalAction;
