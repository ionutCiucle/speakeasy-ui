import { AuthAction, AuthState } from './types';
import { AuthActionType } from './enums';

export const authInitialState: AuthState = {
  username: '',
  userId: null,
  token: null,
  isLoading: false,
};

export function authReducer(
  state: AuthState = authInitialState,
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case AuthActionType.SetUsername:
      return { ...state, username: action.payload };
    case AuthActionType.RegisterPending:
      return { ...state, isLoading: true };
    case AuthActionType.RegisterSuccess:
      return { ...state, isLoading: false };
    case AuthActionType.RegisterFailure:
      return { ...state, isLoading: false, userId: null, token: null };
    case AuthActionType.LoginPending:
      return { ...state, isLoading: true };
    case AuthActionType.LoginSuccess:
      return {
        ...state,
        isLoading: false,
        userId: action.payload.userId,
        token: action.payload.token,
      };
    case AuthActionType.LoginFailure:
      return { ...state, isLoading: false, userId: null, token: null };
    case AuthActionType.Logout:
      return { ...authInitialState };
    default:
      return state;
  }
}
