/*
 *
 * Auth Sagas
 *
 */

import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { DUMMY_API } from 'constants/endpoints'
import { LOGIN_USER, SIGNUP_USER, AUTH_LOGIN_USER } from './constants'
import {
  success,
  error,
  signupSuccess,
  signupError,
  authLoginSucces,
  authLoginError
} from './actions'

// login
function * loginSaga (action) {
  /**
   * Real exmple of a login request
   */
  // const requestUrl = `${DUMMY_API}/auth/local` // <-- add real endpoint
  // const headers = { 'Content-Type': 'application/json' }
  // const body = JSON.stringify(action.credentials)

  // const response = yield call(request, requestUrl, {
  //   method: 'POST',
  //   headers,
  //   body
  // })

  // if (!response.err) {
  //   yield put(success(response.data))
  // } else {
  //   yield put(error(response.err))
  // }

  /**
   *
   * Fake login
   * this will allways login
   *
   */
  const requestUrl = `${DUMMY_API}/users/0`
  const headers = { 'Content-Type': 'application/json' }

  const response = yield call(request, requestUrl, {
    headers
  })

  if (!response.err) {
    yield put(success(response.data))
  } else {
    yield put(error(response.err))
  }
}

function * login () {
  yield takeLatest(LOGIN_USER, loginSaga)
}

// signup
function * signupSaga (action) {
  const requestUrl = `${DUMMY_API}/signup` // <-- add real endpoint
  const headers = { 'Content-Type': 'application/json' }
  const body = JSON.stringify(action.credentials)

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body
  })

  if (!response.err) {
    yield put(signupSuccess(response.data))
  } else {
    yield put(signupError(response.err))
  }
}

function * signup () {
  yield takeLatest(SIGNUP_USER, signupSaga)
}

// auth login
function * authLoginSaga () {
  const requestUrl = `${DUMMY_API}/token/login` // <-- add real endpoint
  const state = yield select()
  const headers = yield call(getDefaultHeaders, state)

  const response = yield call(request, requestUrl, { headers })

  if (!response.err) {
    yield put(authLoginSucces(response.data))
  } else {
    yield put(authLoginError(response.err))
  }
}

function * authLogin () {
  yield takeLatest(AUTH_LOGIN_USER, authLoginSaga)
}

export default [login, signup, authLogin]
