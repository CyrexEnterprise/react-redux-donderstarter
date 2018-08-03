/**
 * @module TodoList/sagas
 */

import { takeLatest, put } from 'redux-saga/effects'
import {
  // FETCH_TODOS,
  // fetchTodosSuccess,
  // fetchTodosError,
  CREATE_TODO,
  // createTodoSuccess,
  createTodoError,
  DELETE_TODO,
  // deleteTodoSuccess,
  deleteTodoError
} from './ducks'

/**
 * create todo saga worker
 * @param {Object} action
 */
function * createTodoWorker (getFirebase, action) {
  try {
    yield getFirebase().push('todos', action.data)
  } catch (err) {
    yield put(createTodoError(err))
  }
}

/**
 * create todo saga
 */
export function * createTodoSaga (getFirebase) {
  yield takeLatest(CREATE_TODO, createTodoWorker, getFirebase)
}

/**
 * delete todo saga worker
 * @param {Object} action
 */
function * deleteTodoWorker (getFirebase, action) {
  try {
    yield getFirebase().remove(`/todos/${action.data.id}`)
  } catch (err) {
    yield put(deleteTodoError(err))
  }
}

/**
 * delete todo saga
 */
export function * deleteTodoSaga (getFirebase) {
  yield takeLatest(DELETE_TODO, deleteTodoWorker, getFirebase)
}

export default [createTodoSaga, deleteTodoSaga]
