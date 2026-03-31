import { CreateTabAction, CreateTabState } from './types';
import { CreateTabActionType } from './enums';

export const createTabInitialState: CreateTabState = {
  tabName: '',
  venue: '',
  currency: { code: 'USD', name: 'US Dollar' },
  notes: '',
  members: [],
  menuItems: [],
  isSubmitting: false,
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
    case CreateTabActionType.AddMenuItem: {
      return { ...state, menuItems: [...state.menuItems, action.payload] };
    }
    case CreateTabActionType.RemoveMenuItem: {
      return {
        ...state,
        menuItems: state.menuItems.filter((i) => i.id !== action.payload),
      };
    }
    case CreateTabActionType.Reset: {
      return createTabInitialState;
    }
    case CreateTabActionType.SubmitPending: {
      return { ...state, isSubmitting: true };
    }
    case CreateTabActionType.SubmitSuccess: {
      return { ...state, isSubmitting: false };
    }
    case CreateTabActionType.SubmitFailure: {
      return { ...state, isSubmitting: false };
    }
    default: {
      return state;
    }
  }
}
