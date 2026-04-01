import { Dispatch } from 'react';
import { AppAction } from '@/state-management/store';
import { TabAPI } from '@/services';
import { TabsActionType } from './enums';
import { Tab } from './types';

export const getTabsAsyncAction =
  (dispatch: Dispatch<AppAction>) => async () => {
    dispatch({ type: TabsActionType.GetTabsPending });
    try {
      const { data } = await TabAPI.get<Tab[]>('/');
      dispatch({ type: TabsActionType.GetTabsSuccess, payload: data });
      return true;
    } catch {
      dispatch({ type: TabsActionType.GetTabsFailure });
      return false;
    }
  };
