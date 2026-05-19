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

interface MemberOrderItem {
  menuItemId: string;
  quantity: number;
}

export const updateMemberItemsAsyncAction =
  (dispatch: Dispatch<AppAction>) =>
  async (tabId: string, userId: string, items: MemberOrderItem[]) => {
    dispatch({ type: TabsActionType.UpdateMemberItemsPending });
    try {
      await TabAPI.patch(`/${tabId}/members/${userId}/items`, { items });
      dispatch({ type: TabsActionType.UpdateMemberItemsSuccess });
      return true;
    } catch {
      dispatch({ type: TabsActionType.UpdateMemberItemsFailure });
      return false;
    }
  };
