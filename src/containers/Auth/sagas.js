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
 * login saga worker
 * @param {Object} action
 * @param {credentials} action.credentials
 */
function * loginWorker (action) {
  const requestUrl = `${API_URL}/users/0` // <-- add a real endpoint
  // const headers = { 'Content-Type': 'application/json' }
  // const body = JSON.stringify(action.credentials)

  const response = yield call(request, requestUrl, {
    method: 'GET', // <-- shold be a `POST` in real calls
    // headers,
    // body
  })

  if (!response.err) {
    yield put(loginSuccess(response.data))
  } else {
    yield put(loginError(response.err))
  }
}

/**
 * login saga
 */
export function * loginSaga () {
  yield takeLatest(LOGIN_USER, loginWorker)
}

/**
 * automatic login saga worker
 */
function * authLoginWorker () {
  const requestUrl = `${API_URL}/users/0` // <-- add a real endpoint
  const state = yield select()
  const headers = yield call(getDefaultHeaders, state)

  const response = yield call(request, requestUrl, { headers })

  if (!response.err) {
    yield put(authLoginSuccess(response.data))
  } else {
    yield put(authLoginError(response.err))
  }
}

/**
 * automatic login saga
 */
export function * authLoginSaga () {
  yield takeLatest(AUTH_LOGIN_USER, authLoginWorker)
}

export default [loginSaga, authLoginSaga]
