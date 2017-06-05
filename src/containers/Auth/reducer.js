/*
 *
 * Auth reducer
 *
 */

import Immutable from 'seamless-immutable'
import cookie from 'react-cookie'
import {
  TOKEN_KEY,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  AUTH_LOGIN_USER,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_LOGIN_USER_ERROR,
  LOGOUT_USER
} from './constants'

const initialState = Immutable.from({
  authToken: cookie.load(TOKEN_KEY) || null,
  user: {},
  isAuthorizing: false
})

function appReducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
    case SIGNUP_USER:
    case AUTH_LOGIN_USER:
      return state
        .set('isAuthorizing', true)
    case LOGIN_USER_SUCCESS:
    case SIGNUP_USER_SUCCESS:
      return state
        .set('authToken', action.token)
        .set('user', action.user)
        .set('isAuthorizing', false)
    case AUTH_LOGIN_USER_SUCCESS:
      return state
        .set('user', action.user)
        .set('isAuthorizing', false)
    case LOGIN_USER_ERROR:
    case SIGNUP_USER_ERROR:
    case AUTH_LOGIN_USER_ERROR:
      return state
        .set('authToken', null)
        .set('user', {})
        .set('isAuthorizing', false)
    case LOGOUT_USER:
      return state
        .set('authToken', null)
        .set('user', {})
        .set('isAuthorizing', false)
    default:
      return state
  }
}

export default appReducer
