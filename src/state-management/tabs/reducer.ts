import { TabsAction, TabsState } from './types';
import { TabsActionType } from './enums';

export const tabsInitialState: TabsState = {
  isUpdatingMenuItems: false,
  isUpdatingMemberItems: false,
};

export function tabsReducer(
  state: TabsState = tabsInitialState,
  action: TabsAction,
): TabsState {
  switch (action.type) {
    case TabsActionType.UpdateMenuItemsPending: {
      return { ...state, isUpdatingMenuItems: true };
    }
    case TabsActionType.UpdateMenuItemsSuccess:
    case TabsActionType.UpdateMenuItemsFailure: {
      return { ...state, isUpdatingMenuItems: false };
    }
    case TabsActionType.UpdateMemberItemsPending: {
      return { ...state, isUpdatingMemberItems: true };
    }
    case TabsActionType.UpdateMemberItemsSuccess:
    case TabsActionType.UpdateMemberItemsFailure: {
      return { ...state, isUpdatingMemberItems: false };
    }
    default: {
      return state;
    }
  }
}
