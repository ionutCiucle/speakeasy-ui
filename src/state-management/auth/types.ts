import { AuthActionType } from './enums';

export interface AuthState {
  username: string;
}

export interface SetUsernameAction {
  type: AuthActionType.SET_USERNAME;
  payload: string;
}

export type AuthAction = SetUsernameAction;
