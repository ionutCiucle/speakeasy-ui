import { AuthActionType } from './enums';

export interface AuthState {
  username: string;
  userId: string | null;
  token: string | null;
  isLoading: boolean;
}

export interface SetUsernameAction {
  type: AuthActionType.SetUsername;
  payload: string;
}

export interface RegisterSuccessAction {
  type: AuthActionType.RegisterSuccess;
  payload: { userId: string; token: string };
}

export interface RegisterFailureAction {
  type: AuthActionType.RegisterFailure;
}

export interface LoginPendingAction {
  type: AuthActionType.LoginPending;
}

export interface RegisterPendingAction {
  type: AuthActionType.RegisterPending;
}

export interface LoginSuccessAction {
  type: AuthActionType.LoginSuccess;
  payload: { userId: string; token: string };
}

export interface LoginFailureAction {
  type: AuthActionType.LoginFailure;
}

export interface LogoutAction {
  type: AuthActionType.Logout;
}

export type AuthAction = SetUsernameAction | RegisterPendingAction | RegisterSuccessAction | RegisterFailureAction | LoginPendingAction | LoginSuccessAction | LoginFailureAction | LogoutAction;
