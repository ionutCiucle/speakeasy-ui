import { Dispatch } from 'react';
import { AppAction } from '../store';
import { AuthActionType } from './enums';
import { AuthAPI, saveToken, removeToken } from '../../services';

interface AuthResponse {
  token: string;
  user: { id: string; email: string };
}

export const loginAsyncAction = (dispatch: Dispatch<AppAction>) => async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  dispatch({ type: AuthActionType.LoginPending });
  try {
    const { data } = await AuthAPI.post<AuthResponse>('/login', { email, password });
    await saveToken(data.token);
    dispatch({ type: AuthActionType.LoginSuccess, payload: { userId: data.user.id, token: data.token } });
    return true;
  } catch {
    dispatch({ type: AuthActionType.LoginFailure });
    return false;
  }
};

export const logoutAsyncAction = (dispatch: Dispatch<AppAction>) => async () => {
  await removeToken();
  dispatch({ type: AuthActionType.Logout });
};

export const registerAsyncAction = (dispatch: Dispatch<AppAction>) => async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  dispatch({ type: AuthActionType.RegisterPending });
  try {
    const { data } = await AuthAPI.post<AuthResponse>('/register', { email, password });
    await saveToken(data.token);
    dispatch({ type: AuthActionType.RegisterSuccess, payload: { userId: data.user.id, token: data.token } });
    return true;
  } catch {
    dispatch({ type: AuthActionType.RegisterFailure });
    return false;
  }
};
