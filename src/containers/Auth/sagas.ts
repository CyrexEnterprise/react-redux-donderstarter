import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import { LOGIN_USER, AUTH_LOGIN_USER, authActionCreators } from './ducks'
// import { AuthActionTypes } from './types'

// function * login ({ payload }: AuthActionTypes['login']) { // <-- get credentials from action payload
function * login () {
  try {
    const requestUrl = `${API_URL}/users/0` // <-- add a real endpoint
    // const headers = { 'Content-Type': 'application/json' }
    // const body = JSON.stringify(payload)

    const { id, name, scope, token } = yield call(request, requestUrl, {
      method: 'GET', // <-- shold be a `POST` in real calls
    // headers,
    // body
    })

    yield put(authActionCreators.loginSuccess({ user: { id, name, scope }, token }))
  } catch (error) {
    yield put(authActionCreators.loginError(error))
  }
}

function * authLogin () {
  try {
    const requestUrl = `${API_URL}/users/0` // <-- add a real endpoint
    const state = yield select()
    const headers = yield call(getDefaultHeaders, state)

    const { id, name, scope } = yield call(request, requestUrl, { headers })

    yield put(authActionCreators.authLoginSuccess({ user: { id, name, scope } }))
  } catch (error) {
    yield put(authActionCreators.authLoginError(error))
  }
}

export function * rootSaga () {
  yield takeLatest(LOGIN_USER, login)
  yield takeLatest(AUTH_LOGIN_USER, authLogin)
}

export default rootSaga
