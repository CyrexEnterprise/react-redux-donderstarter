const constants = function (name, withSagas) {
  return withSagas
    ? `
/**
* Constants
*/
export const INCREMENT = '${name}/INCREMENT'
export const INCREMENT_SUCCESS = '${name}/INCREMENT_SUCCESS'
export const INCREMENT_ERROR = '${name}/INCREMENT_ERROR'
export const INCREMENT_LOAD = '${name}/INCREMENT_LOAD'
export const INCREMENT_LOAD_SUCCESS = '${name}/INCREMENT_LOAD_SUCCESS'
export const INCREMENT_LOAD_ERROR = '${name}/INCREMENT_LOAD_ERROR'`
    : `
/**
* Constants
*/
export const INCREMENT = '${name}/INCREMENT'`
}

const initialState = function (name, withSagas) {
  return withSagas
    ? `
/**
 * ${name} state
 * @typedef {Object} state
 * @prop {number} counter - The total counter
 * @prop {boolean} loaded - Flag if the counter was already loaded
 * @prop {error} [error] - Error message while fetching the server
 */
const initialState = {
  counter: 0,
  loaded: false,
  error: null
}`
    : `
/**
* ${name} state
* @typedef {Object} state
* @prop {number} counter - The total counter
*/
const initialState = {
  counter: 0
}
`
}

const reducer = function (withSagas) {
  return withSagas
    ? `switch (action.type) {
    case INCREMENT_SUCCESS:
      return update(state, {
        counter: { $set: action.data.total },
        error: { $set: null }
      })
    case INCREMENT_ERROR:
      return update(state, {
        error: { $set: action.error.message }
      })
    case INCREMENT_LOAD_SUCCESS:
      return update(state, {
        counter: { $set: action.data.total },
        loaded: { $set: true },
        error: { $set: null }
      })
    case INCREMENT_LOAD_ERROR:
      return update(state, {
        loaded: { $set: false },
        error: { $set: action.error.message }
      })
    default:
      return state
  }`
    : `switch (action.type) {
    case INCREMENT:
      return update(state, {
        counter: { $set: state.counter + 1 }
      })
    default:
      return state
  }`
}

const actionCreators = function () {
  return `

/**
 * increment success action creator
 */
export function incrementSuccess (data) {
  return { type: INCREMENT_SUCCESS, data }
}

/**
 * increment error action creator
 */
export function incrementError (error) {
  return { type: INCREMENT_ERROR, error }
}

/**
 * load increment action creator
 */
export function loadIncrement () {
  return { type: INCREMENT_LOAD }
}

/**
 * load increment success action creator
 */
export function loadIncrementSuccess (data) {
  return { type: INCREMENT_LOAD_SUCCESS, data }
}

/**
 * load increment error action creator
 */
export function loadIncrementError (error) {
  return { type: INCREMENT_LOAD_ERROR, error }
}`
}

module.exports = function (name, withSagas) {
  return `import update from 'immutability-helper'
${constants(name, withSagas)}
${initialState(name, withSagas)}
/**
 * Reducer
 * @param {state} [state=initialState] - ${name} state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  ${reducer(withSagas)}
}

/**
 * increment action creator
 */
export function increment () {
  return { type: INCREMENT }
}${withSagas ? actionCreators() : ''}
`
}
