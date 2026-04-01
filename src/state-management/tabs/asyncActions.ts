import { Dispatch } from 'react';
import { AppAction } from '@/state-management/store';
import { TabAPI } from '@/services';
import { TabsActionType } from './enums';
import type { TabDTO } from './dto';

export const getTabsAsyncAction =
  (dispatch: Dispatch<AppAction>) => async () => {
    dispatch({ type: TabsActionType.GetTabsPending });
    try {
      const { data } = await TabAPI.get<TabDTO[]>('/');
      dispatch({ type: TabsActionType.GetTabsSuccess, payload: data });
      return true;
    } catch {
      dispatch({ type: TabsActionType.GetTabsFailure });
      return false;
    }
  };
