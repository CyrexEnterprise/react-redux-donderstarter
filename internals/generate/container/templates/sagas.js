module.exports = function () {
  return `import request from 'util/request'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import {
  INCREMENT,
  incrementSuccess,
  incrementError,
  INCREMENT_LOAD,
  loadIncrementSuccess,
  loadIncrementError,
} from './ducks'

/**
 * increment saga worker
 * @param {Object} action
 */
function * increment (action) {
  try {
    const requestUrl = \`$\{API_URL}/counter\`
    const headers = { 'Content-Type': 'application/json' }
    const state = yield select()
    const total = state.foo.counter + 1
    const body = JSON.stringify({ total })

    const { data } = yield call(request, requestUrl, {
      method: 'POST',
      headers,
      body,
    })

    yield put(incrementSuccess(data))
  } catch (error) {
    yield put(incrementError(error))
  }
}

/**
 * load increment saga worker
 * @param {Object} action
 */
function * loadIncrement (action) {
  try {
    const requestUrl = \`$\{API_URL}/counter\`

    const { data } = yield call(request, requestUrl, {
      method: 'GET',
    })

    yield put(loadIncrementSuccess(data))
  } catch (error) {
    yield put(loadIncrementError(error))
  }
}

export function * rootSaga () {
  yield takeLatest(INCREMENT, increment)
  yield takeLatest(INCREMENT_LOAD, loadIncrement)
}

export default rootSaga
`
}
