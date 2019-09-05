import cookie from 'js-cookie'
import update from 'immutability-helper'
import * as router from 'connected-react-router'

import { TOKEN_KEY, TOKEN_MAX_AGE, __DEV__ } from 'constants/env'

import { AuthStoreState, AuthActionCreators, AuthActionTypes } from './types'
import { Reducer, Middleware } from 'redux'
import { Store } from 'store/types'

/**
 * Constants
 */
export const LOGIN_USER = 'Auth/LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'Auth/LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'Auth/LOGIN_USER_ERROR'

export const AUTH_LOGIN_USER = 'Auth/AUTH_LOGIN_USER'
export const AUTH_LOGIN_USER_SUCCESS = 'Auth/AUTH_LOGIN_USER_SUCCESS'
export const AUTH_LOGIN_USER_ERROR = 'Auth/AUTH_LOGIN_USER_ERROR'

export const LOGOUT_USER = 'Auth/LOGOUT_USER'

const initialState: AuthStoreState = {
  authToken: cookie.get(TOKEN_KEY) || undefined,
  user: undefined,
  isAuthorizing: false,
}

const reducer: Reducer<AuthStoreState> = function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
    case AUTH_LOGIN_USER: {
      return update(state, {
        isAuthorizing: { $set: true },
      })
    }

    case LOGIN_USER_SUCCESS: {
      const { payload } = action as AuthActionTypes['loginSuccess']

      return update(state, {
        authToken: { $set: payload.token },
        user: { $set: payload.user },
        isAuthorizing: { $set: false },
      })
    }

    case AUTH_LOGIN_USER_SUCCESS: {
      const { payload } = action as AuthActionTypes['authLoginSuccess']

      return update(state, {
        user: { $set: payload.user },
        isAuthorizing: { $set: false },
      })
    }

    case LOGIN_USER_ERROR:
    case AUTH_LOGIN_USER_ERROR:
    case LOGOUT_USER: {
      return update(state, {
        authToken: { $set: undefined },
        user: { $set: undefined },
        isAuthorizing: { $set: false },
      })
    }

    default:
      return state
  }
}

export default reducer

export const authActionCreators: AuthActionCreators = {
  login: (payload) => ({ type: LOGIN_USER, payload }),
  loginSuccess: (payload) => ({ type: LOGIN_USER_SUCCESS, payload }),
  loginError: (payload) => ({ type: LOGIN_USER_ERROR, payload }),
  authLogin: () => ({ type: AUTH_LOGIN_USER }),
  authLoginSuccess: (payload) => ({ type: AUTH_LOGIN_USER_SUCCESS, payload }),
  authLoginError: (payload) => ({ type: AUTH_LOGIN_USER_ERROR, payload }),
  logout: () => ({ type: LOGOUT_USER }),
}

/**
 * Auth/Login store middleware
 *
 * Intercepts login and auth success and errors and sets or
 * removes a cookie accordingly. This way we can keep users
 * logged in if the user resets the application.
 * i.e. when the page is reloaded.
 */
export const authMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)

  if (action.type === LOGIN_USER_SUCCESS) {
    const { payload } = action as AuthActionTypes['loginSuccess']

    cookie.set(TOKEN_KEY, payload.token, {
      path: '/',
      expires: TOKEN_MAX_AGE,
      secure: !__DEV__,
    })

    const state: Store = store.getState()
    const location = state.router.location

    const nextPath = location.state && location.state.onSuccess ? location.state.onSuccess : '/'
    store.dispatch(router.replace(nextPath))
  } else if (action.type === AUTH_LOGIN_USER_ERROR) {
    cookie.remove(TOKEN_KEY, { path: '/' })
  } else if (action.type === LOGOUT_USER) {
    cookie.remove(TOKEN_KEY, { path: '/' })
    store.dispatch(router.replace('/login'))
  }
}
