/*
 *
 * Auth constants
 *
 */

export const TOKEN_KEY = 'a_t'
export const TOKEN_MAX_AGE = 60 * 60 * 24 * 14 // <-- 14 days (sec, min, hour, day)
export const LOGIN_USER = 'Auth/LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'Auth/LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'Auth/LOGIN_USER_ERROR'
export const SIGNUP_USER = 'Auth/SIGNUP_USER'
export const SIGNUP_USER_SUCCESS = 'Auth/SIGNUP_USER_SUCCESS'
export const SIGNUP_USER_ERROR = 'Auth/SIGNUP_USER_ERROR'
export const USER_ROLES = ['user', 'admin']
export const AUTH_LOGIN_USER = 'Auth/AUTH_LOGIN_USER'
export const AUTH_LOGIN_USER_SUCCESS = 'Auth/AUTH_LOGIN_USER_SUCCESS'
export const AUTH_LOGIN_USER_ERROR = 'Auth/AUTH_LOGIN_USER_ERROR'
export const LOGOUT_USER = 'Auth/LOGOUT_USER'
