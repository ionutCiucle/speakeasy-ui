import { Dispatch } from 'react';
import { AppAction } from '@/state-management/store';
import { TabAPI } from '@/services';
import { TabsActionType } from './enums';
import type { TabDTO } from './dto';

interface UpdateTabMenuItemsBody {
  menuItems: { name: string; price: number }[];
}

export const updateTabMenuItemsAsyncAction =
  (dispatch: Dispatch<AppAction>) =>
  async (tabId: string, menuItems: UpdateTabMenuItemsBody['menuItems']) => {
    dispatch({ type: TabsActionType.UpdateMenuItemsPending });
    try {
      await TabAPI.patch<TabDTO>(`/${tabId}`, { menuItems });
      dispatch({ type: TabsActionType.UpdateMenuItemsSuccess });
      return true;
    } catch {
      dispatch({ type: TabsActionType.UpdateMenuItemsFailure });
      return false;
    }
  };
