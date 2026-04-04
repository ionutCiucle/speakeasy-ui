import { TabsActionType } from './enums';

export interface TabsState {
  isUpdatingMenuItems: boolean;
}

export type TabsAction =
  | { type: TabsActionType.UpdateMenuItemsPending }
  | { type: TabsActionType.UpdateMenuItemsSuccess }
  | { type: TabsActionType.UpdateMenuItemsFailure };
