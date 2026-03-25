import { AuthAction, AuthState } from './types';
import { AuthActionType } from './enums';

export const authInitialState: AuthState = {
  username: '',
};

export function authReducer(state: AuthState = authInitialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionType.SetUsername:
      return { ...state, username: action.payload };
    default:
      return state;
  }
}
