import { AnyAction } from 'redux'
import { History, Location } from 'history'
import { ErrorReason } from 'util/request'

export interface AuthStoreState {
  authToken?: string,
  user?: AuthUser,
  isAuthorizing: boolean,
}

export interface RequireAuthProps {
  history: History,
  location: Location,
  isAuthorizing: AuthStoreState['isAuthorizing'],
  Component: React.ElementType,
  scopes: string[],
  scopesRequired: string[],
}

export interface RequireAuthState {
  isAuthorized: boolean,
}

export interface AuthUser {
  id: number,
  name: string,
  scope: string[],
}

export interface AuthPayloads {
  login: {
    email: string,
    password: string,
  },
  loginSuccess: {
    token: string,
    user: AuthUser,
  },
  loginError: ErrorReason,
  authLoginSuccess: {
    user: AuthUser,
  },
  authLoginError: ErrorReason,
}

export interface AuthActionTypes {
  login: AnyAction & { payload: AuthPayloads['login'] },
  loginSuccess: AnyAction & { payload: AuthPayloads['loginSuccess'] },
  loginError: AnyAction & { payload: AuthPayloads['loginError'] },
  authLogin: AnyAction,
  authLoginSuccess: AnyAction & { payload: AuthPayloads['authLoginSuccess'] },
  authLoginError: AnyAction & { payload: AuthPayloads['authLoginError'] },
  logout: AnyAction,
}

export interface AuthActionCreators {
  login: (payload: AuthPayloads['login']) => AuthActionTypes['login'],
  loginSuccess: (payload: AuthPayloads['loginSuccess']) => AuthActionTypes['loginSuccess'],
  loginError: (payload: AuthPayloads['loginError']) => AuthActionTypes['loginError'],
  authLogin: () => AuthActionTypes['authLogin'],
  authLoginSuccess: (payload: AuthPayloads['authLoginSuccess']) => AuthActionTypes['authLoginSuccess'],
  authLoginError: (payload: AuthPayloads['authLoginError']) => AuthActionTypes['authLoginError'],
  logout: () => AuthActionTypes['logout'],
}
