import { AuthActionType } from './enums';

export interface AuthState {
  username: string;
}

export interface SetUsernameAction {
  type: AuthActionType.SetUsername;
  payload: string;
}

export type AuthAction = SetUsernameAction;
