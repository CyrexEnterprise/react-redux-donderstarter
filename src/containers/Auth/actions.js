/*
 *
 * Auth actions
 *
 */

import {
  LOGIN_USER,
  SIGNUP_USER,
  LOGIN_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SIGNUP_USER_ERROR,
  AUTH_LOGIN_USER,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_LOGIN_USER_ERROR,
  LOGOUT_USER
} from './constants'

export const login = (credentials) => ({ type: LOGIN_USER, credentials })
export const signup = (credentials) => ({ type: SIGNUP_USER, credentials })
export const success = (data) => ({ type: LOGIN_USER_SUCCESS, data })
export const error = (err) => ({ type: LOGIN_USER_ERROR, ...err })
export const signupSuccess = (data) => ({ type: SIGNUP_USER_SUCCESS, ...data })
export const signupError = (err) => ({ type: SIGNUP_USER_ERROR, ...err })
export const authLogin = (token) => ({ type: AUTH_LOGIN_USER, token })
export const authLoginSucces = (data) => ({ type: AUTH_LOGIN_USER_SUCCESS, data })
export const authLoginError = () => ({ type: AUTH_LOGIN_USER_ERROR })
export const logout = () => ({ type: LOGOUT_USER })
