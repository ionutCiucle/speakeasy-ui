import { CreateTabAction, CreateTabState } from './types';
import { CreateTabActionType } from './enums';

export const createTabInitialState: CreateTabState = {
  tabName: '',
  venue: '',
  currency: { code: 'USD', name: 'US Dollar' },
  notes: '',
};

export function createTabReducer(
  state: CreateTabState = createTabInitialState,
  action: CreateTabAction,
): CreateTabState {
  switch (action.type) {
    case CreateTabActionType.SetTabName: {
      return { ...state, tabName: action.payload };
    }
    case CreateTabActionType.SetVenue: {
      return { ...state, venue: action.payload };
    }
    case CreateTabActionType.SetCurrency: {
      return { ...state, currency: action.payload };
    }
    case CreateTabActionType.SetNotes: {
      return { ...state, notes: action.payload };
    }
    default: {
      return state;
    }
  }
}
