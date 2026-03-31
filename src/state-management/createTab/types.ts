import { CreateTabActionType } from './enums';

export interface CreateTabState {
  tabName: string;
  venue: string;
  currency: { code: string; name: string };
  notes: string;
}

export interface SetTabNameAction {
  type: CreateTabActionType.SetTabName;
  payload: string;
}

export interface SetVenueAction {
  type: CreateTabActionType.SetVenue;
  payload: string;
}

export interface SetCurrencyAction {
  type: CreateTabActionType.SetCurrency;
  payload: { code: string; name: string };
}

export interface SetNotesAction {
  type: CreateTabActionType.SetNotes;
  payload: string;
}

export type CreateTabAction =
  | SetTabNameAction
  | SetVenueAction
  | SetCurrencyAction
  | SetNotesAction;
