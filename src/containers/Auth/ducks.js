/**
 * @module Auth/ducks
 */

import cookie from 'js-cookie'
import update from 'immutability-helper'

/**
 * Constants
 */
export const TOKEN_KEY = 'a_t'
export const TOKEN_MAX_AGE = 30 // <-- 1 month
export const LOGIN_USER = 'Auth/LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'Auth/LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'Auth/LOGIN_USER_ERROR'
export const AUTH_LOGIN_USER = 'Auth/AUTH_LOGIN_USER'
export const AUTH_LOGIN_USER_SUCCESS = 'Auth/AUTH_LOGIN_USER_SUCCESS'
export const AUTH_LOGIN_USER_ERROR = 'Auth/AUTH_LOGIN_USER_ERROR'
export const LOGOUT_USER = 'Auth/LOGOUT_USER'

/**
 * Auth state
 * @typedef {Object} state
 * @prop {string} [authtoken] - token provided after login or loaded from cookies
 * @prop {Object} user - user object
 * @prop {arra[string]} scopes - the user scopes
 * @prop {boolean} isAuthorizing - flag to tell if the API was called to authenticate the user
 */
const initialState = {
  authToken: cookie.get(TOKEN_KEY) || null,
  user: {},
  scopes: [],
  isAuthorizing: false,
}

/**
 * Reducer
 * @param {state} [state=initialState] - Auth state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
    case AUTH_LOGIN_USER:
      return update(state, {
        isAuthorizing: { $set: true },
      })
    case LOGIN_USER_SUCCESS:
      return update(state, {
        authToken: { $set: action.data.token },
        user: { $set: action.data },
        scopes: { $set: action.data.scope },
        isAuthorizing: { $set: false },
      })
    case AUTH_LOGIN_USER_SUCCESS:
      return update(state, {
        user: { $set: action.data },
        scopes: { $set: action.data.scope },
        isAuthorizing: { $set: false },
      })
    case LOGIN_USER_ERROR:
    case AUTH_LOGIN_USER_ERROR:
    case LOGOUT_USER:
      return update(state, {
        authToken: { $set: null },
        user: { $set: {} },
        scopes: { $set: [] },
        isAuthorizing: { $set: false },
      })
    default:
      return state
  }
}

/**
 * User email and password
 * @typedef {Object} credentials
 * @prop {string} email - user email
 * @prop {string} password - user password
 */

/**
 * login action creator
 * @param {credentials} credentials
 */
export function login (credentials) {
  return { type: LOGIN_USER, credentials }
}

/**
 * login success action creator
 * @param {Object} data - data received from the successful call
 */
export function loginSuccess (data) {
  return { type: LOGIN_USER_SUCCESS, data }
}

/**
 * login error action creator
 * @param {ServerError} error
 */
export function loginError (error) {
  return { type: LOGIN_USER_ERROR, error }
}

/**
 * automatic login action creator
 * @param {string} token - the token string saved in local storage
 */
export function authLogin (token) {
  return { type: AUTH_LOGIN_USER, token }
}

/**
 * automatic login success action creator
 * @param {Object} data - data received from the successful call
 */
export function authLoginSuccess (data) {
  return { type: AUTH_LOGIN_USER_SUCCESS, data }
}

/**
 * automatic login error action creator
 */
export function authLoginError (error) {
  return { type: AUTH_LOGIN_USER_ERROR, error }
}

/**
 * logout action
 */
export function logout () {
  return { type: LOGOUT_USER }
}

/**
 * Auth/Login store middleware
 *
 * Intercepts login and auth success and errors and sets or
 * removes a cookie accordingly. This way we can keep users
 * logged in if the user resets the application.
 * i.e. when the page is reloaded.
 */
export const createAuthMiddleware = (history) => (store) => (next) => (action) => {
  next(action)

  if (action.type === LOGIN_USER_SUCCESS) {
    cookie.set(TOKEN_KEY, action.data.token, {
      path: '/',
      expires: TOKEN_MAX_AGE,
    })

    const nextPath = history.location.state && history.location.state.onSuccess ? history.location.state.onSuccess : '/'
    history.replace(nextPath)
  } else if (action.type === AUTH_LOGIN_USER_ERROR) {
    cookie.remove(TOKEN_KEY, { path: '/' })
  } else if (action.type === LOGOUT_USER) {
    cookie.remove(TOKEN_KEY, { path: '/' })
    history.replace('/login')
  }
}
