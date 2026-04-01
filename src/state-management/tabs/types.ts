import { TabsActionType } from './enums';
import type { TabDTO } from './dto';

export interface TabsState {
  tabs: TabDTO[];
  isLoading: boolean;
}

export interface GetTabsPendingAction {
  type: TabsActionType.GetTabsPending;
}

export interface GetTabsSuccessAction {
  type: TabsActionType.GetTabsSuccess;
  payload: TabDTO[];
}

export interface GetTabsFailureAction {
  type: TabsActionType.GetTabsFailure;
}

export type TabsAction =
  | GetTabsPendingAction
  | GetTabsSuccessAction
  | GetTabsFailureAction;
