import { CreateTabActionType } from './enums';

export interface Member {
  id: string;
  name: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
}

export interface CreateTabState {
  tabName: string;
  venue: string;
  currency: { code: string; name: string };
  notes: string;
  members: Member[];
  menuItems: MenuItem[];
  isSubmitting: boolean;
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

export interface AddMemberAction {
  type: CreateTabActionType.AddMember;
  payload: Member;
}

export interface RemoveMemberAction {
  type: CreateTabActionType.RemoveMember;
  payload: string;
}

export interface AddMenuItemAction {
  type: CreateTabActionType.AddMenuItem;
  payload: MenuItem;
}

export interface RemoveMenuItemAction {
  type: CreateTabActionType.RemoveMenuItem;
  payload: string;
}

export interface ResetAction {
  type: CreateTabActionType.Reset;
}

export interface SubmitPendingAction {
  type: CreateTabActionType.SubmitPending;
}

export interface SubmitSuccessAction {
  type: CreateTabActionType.SubmitSuccess;
}

export interface SubmitFailureAction {
  type: CreateTabActionType.SubmitFailure;
}

export type CreateTabAction =
  | SetTabNameAction
  | SetVenueAction
  | SetCurrencyAction
  | SetNotesAction
  | AddMemberAction
  | RemoveMemberAction
  | AddMenuItemAction
  | RemoveMenuItemAction
  | ResetAction
  | SubmitPendingAction
  | SubmitSuccessAction
  | SubmitFailureAction;
