/**
 * @module Auth/sagas
 */

import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import {
  LOGIN_USER,
  AUTH_LOGIN_USER,
  loginSuccess,
  loginError,
  authLoginSuccess,
  authLoginError,
} from './ducks'

/**
 * User email and password
 * @typedef {Object} credentials
 * @prop {string} email - user email
 * @prop {string} password - user password
 */

/**
 * login
 * @param {Object} action
 * @param {credentials} action.credentials
 */
function * login (action) {
  try {
    const requestUrl = `${API_URL}/users/0` // <-- add a real endpoint
    // const headers = { 'Content-Type': 'application/json' }
    // const body = JSON.stringify(action.credentials)

    const { data } = yield call(request, requestUrl, {
      method: 'GET', // <-- shold be a `POST` in real calls
    // headers,
    // body
    })

    yield put(loginSuccess(data))
  } catch (error) {
    yield put(loginError(error))
  }
}

/**
 * automatic login
 */
function * authLogin () {
  try {
    const requestUrl = `${API_URL}/users/0` // <-- add a real endpoint
    const state = yield select()
    const headers = yield call(getDefaultHeaders, state)

    const { data } = yield call(request, requestUrl, { headers })

    yield put(authLoginSuccess(data))
  } catch (error) {
    yield put(authLoginError(error))
  }
}

export function * rootSaga () {
  yield takeLatest(LOGIN_USER, login)
  yield takeLatest(AUTH_LOGIN_USER, authLogin)
}

export default rootSaga
