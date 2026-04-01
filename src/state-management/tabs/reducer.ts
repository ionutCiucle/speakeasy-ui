import { TabsAction, TabsState } from './types';
import { TabsActionType } from './enums';

export const tabsInitialState: TabsState = {
  tabs: [],
  isLoading: false,
};

export function tabsReducer(
  state: TabsState = tabsInitialState,
  action: TabsAction,
): TabsState {
  switch (action.type) {
    case TabsActionType.GetTabsPending: {
      return { ...state, isLoading: true };
    }
    case TabsActionType.GetTabsSuccess: {
      return { ...state, isLoading: false, tabs: action.payload };
    }
    case TabsActionType.GetTabsFailure: {
      return { ...state, isLoading: false };
    }
    default: {
      return state;
    }
  }
}
