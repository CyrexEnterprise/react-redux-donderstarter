
/**
 * @module TodoList/ducks
 */

import update from 'immutability-helper'

/**
 * Constants
 */
export const FETCH_TODOS = 'TodoList/FETCH_TODOS'
export const FETCH_TODOS_SUCCESS = 'TodoList/FETCH_TODOS_SUCCESS'
export const FETCH_TODOS_ERROR = 'TodoList/FETCH_TODOS_ERROR'

export const CREATE_TODO = 'TodoList/CREATE_TODO'
export const CREATE_TODO_SUCCESS = 'TodoList/CREATE_TODO_SUCCESS'
export const CREATE_TODO_ERROR = 'TodoList/CREATE_TODO_ERROR'

export const DELETE_TODO = 'TodoList/DELETE_TODO'
export const DELETE_TODO_SUCCESS = 'TodoList/DELETE_TODO_SUCCESS'
export const DELETE_TODO_ERROR = 'TodoList/DELETE_TODO_ERROR'

/**
 * TodoList state
 * @typedef {Object} state

 */
const initialState = {
  data: []
}

/**
   * Reducer
   * @param {state} [state=initialState] - Auth state or initial state
   * @param {object} action - the action type and payload
   */

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
      return update(state, {
        data: { $set: action.data }
      })
    case FETCH_TODOS_ERROR:
      return update(state, {
        data: { $set: [] }
      })
    default:
      return state
  }
}

/**
 * Fetch todos action creator
 */
export function fetchTodos () {
  return { type: FETCH_TODOS }
}

/**
 * Fetch todos success action creator
 * @param {Object} data - data received from the successful call
 */
export function fetchTodosSuccess (data) {
  return { type: FETCH_TODOS_SUCCESS, data }
}

/**
 * Fetch todos error action creator
 * @param {ServerError} error
 */
export function fetchTodosError (error) {
  return { type: FETCH_TODOS_ERROR, error }
}

/**
 * Create todo action creator
 */
export function createTodo (data) {
  return { type: CREATE_TODO, data }
}

/**
 * Create todo success action creator
 * @param {Object} data - data received from the successful call
 */
export function createTodoSuccess (data) {
  return { type: CREATE_TODO_SUCCESS, data }
}

/**
 * Create todo error action creator
 * @param {ServerError} error
 */
export function createTodoError (error) {
  return { type: CREATE_TODO_ERROR, error }
}

/**
 * Delete todo action creator
 */
export function deleteTodo (data) {
  return { type: DELETE_TODO, data }
}

/**
 * Delete todo success action creator
 * @param {Object} data - data received from the successful call
 */
export function deleteTodoSuccess (data) {
  return { type: DELETE_TODO_SUCCESS, data }
}

/**
 * Delete todo error action creator
 * @param {ServerError} error
 */
export function deleteTodoError (error) {
  return { type: DELETE_TODO_ERROR, error }
}
