import { CreateTabActionType } from './enums';

export interface Member {
  id: string;
  name: string;
}

export interface CreateTabState {
  tabName: string;
  venue: string;
  currency: { code: string; name: string };
  notes: string;
  members: Member[];
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

export type CreateTabAction =
  | SetTabNameAction
  | SetVenueAction
  | SetCurrencyAction
  | SetNotesAction
  | AddMemberAction
  | RemoveMemberAction;
