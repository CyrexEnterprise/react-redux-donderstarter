/**
 * @module TodoList/sagas
 */

import { takeLatest, put } from 'redux-saga/effects'
// import { getFirebase } from 'react-redux-firebase'
import {
  // FETCH_TODOS,
  // fetchTodosSuccess,
  // fetchTodosError,
  CREATE_TODO,
  createTodoSuccess,
  createTodoError
} from './ducks'

/**
 * create todo saga worker
 * @param {Object} action
 */
function * createTodoWorker (getFirebase, action) {
  console.log('createWorker', action, getFirebase)
  const response = yield getFirebase().push('todos', action.data)

  if (!response.err) {
    yield put(createTodoSuccess(response.data))
  } else {
    yield put(createTodoError(response.err))
  }
}

/**
 * create todo saga
 */
export function * createTodoSaga (getFirebase) {
  const worker = createTodoWorker(getFirebase)
  yield takeLatest(CREATE_TODO, worker)
}

export default [createTodoSaga]
