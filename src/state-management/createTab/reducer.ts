import { CreateTabAction, CreateTabState } from './types';
import { CreateTabActionType } from './enums';

export const createTabInitialState: CreateTabState = {
  tabName: '',
  venue: '',
  currency: { code: 'USD', name: 'US Dollar' },
  notes: '',
  members: [],
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
    case CreateTabActionType.AddMember: {
      return { ...state, members: [...state.members, action.payload] };
    }
    case CreateTabActionType.RemoveMember: {
      return {
        ...state,
        members: state.members.filter((m) => m.id !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
}
