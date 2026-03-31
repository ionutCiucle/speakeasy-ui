import { Dispatch } from 'react';
import { AppAction } from '@/state-management/store';
import { TabAPI } from '@/services';
import { CreateTabActionType } from './enums';
import { Member, MenuItem } from './types';

interface CreateTabBody {
  title: string;
  venue: string;
  currency: { code: string; name: string };
  notes: string;
  members: Member[];
  menuItems: MenuItem[];
}

interface TabResponse {
  id: string;
  title: string;
}

export const createTabAsyncAction =
  (dispatch: Dispatch<AppAction>) =>
  async ({ token, ...body }: CreateTabBody & { token: string }) => {
    dispatch({ type: CreateTabActionType.SubmitPending });
    try {
      await TabAPI.post<TabResponse>('/', body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: CreateTabActionType.SubmitSuccess });
      return true;
    } catch {
      dispatch({ type: CreateTabActionType.SubmitFailure });
      return false;
    }
  };
