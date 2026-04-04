import { TabsActionType } from './enums';

export interface TabsState {
  isUpdatingMenuItems: boolean;
  isUpdatingMemberItems: boolean;
}

export type TabsAction =
  | { type: TabsActionType.UpdateMenuItemsPending }
  | { type: TabsActionType.UpdateMenuItemsSuccess }
  | { type: TabsActionType.UpdateMenuItemsFailure }
  | { type: TabsActionType.UpdateMemberItemsPending }
  | { type: TabsActionType.UpdateMemberItemsSuccess }
  | { type: TabsActionType.UpdateMemberItemsFailure };
