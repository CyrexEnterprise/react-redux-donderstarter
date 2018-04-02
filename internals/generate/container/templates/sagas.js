module.exports = function () {
  return `import request from 'util/request'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import { INCREMENT, incrementSuccess, incrementError, INCREMENT_LOAD, loadIncrementSuccess, loadIncrementError } from './ducks'

/**
 * increment saga worker
 * @param {Object} action
 */
function * incrementWorker (action) {
  const requestUrl = \`$\{API_URL}/counter\`
  const headers = { 'Content-Type': 'application/json' }
  const state = yield select()
  const total = state.foo.counter + 1
  const body = JSON.stringify({ total })

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body
  })

  if (!response.err) {
    yield put(incrementSuccess(response.data))
  } else {
    yield put(incrementError(response.err))
  }
}

/**
 * increment saga
 */
export function * incrementSaga () {
  yield takeLatest(INCREMENT, incrementWorker)
}

/**
 * load increment saga worker
 * @param {Object} action
 */
function * loadIncrementWorker (action) {
  const requestUrl = \`$\{API_URL}/counter\`

  const response = yield call(request, requestUrl, {
    method: 'GET'
  })

  if (!response.err) {
    yield put(loadIncrementSuccess(response.data))
  } else {
    yield put(loadIncrementError(response.err))
  }
}

/**
 * load increment saga
 */
export function * loadIncrementSaga () {
  yield takeLatest(INCREMENT_LOAD, loadIncrementWorker)
}

export default [incrementSaga, loadIncrementSaga]
`
}
