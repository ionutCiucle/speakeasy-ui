import { TabsActionType } from './enums';

export interface TabMember {
  id: string;
  tabId: string;
  name: string;
  createdAt: string;
}

export interface TabMenuItem {
  id: string;
  tabId: string;
  name: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

export interface TabItem {
  id: string;
  tabId: string;
  label: string;
  amount: string;
  paidById: string;
  createdAt: string;
  updatedAt: string;
}

export interface TabParticipant {
  id: string;
  tabId: string;
  userId: string;
  createdAt: string;
}

export interface TabSettlement {
  id: string;
  tabId: string;
  payerId: string;
  payeeId: string;
  amount: string;
  createdAt: string;
}

export interface Tab {
  id: string;
  title: string;
  venue: string | null;
  currencyCode: string;
  currencyName: string;
  notes: string | null;
  createdById: string;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
  items: TabItem[];
  participants: TabParticipant[];
  settlements: TabSettlement[];
  members: TabMember[];
  menuItems: TabMenuItem[];
}

export interface TabsState {
  tabs: Tab[];
  isLoading: boolean;
}

export interface GetTabsPendingAction {
  type: TabsActionType.GetTabsPending;
}

export interface GetTabsSuccessAction {
  type: TabsActionType.GetTabsSuccess;
  payload: Tab[];
}

export interface GetTabsFailureAction {
  type: TabsActionType.GetTabsFailure;
}

export type TabsAction =
  | GetTabsPendingAction
  | GetTabsSuccessAction
  | GetTabsFailureAction;
