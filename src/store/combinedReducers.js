/*
 *
 * Combine all reducers in the this file
 * and export them.
 *
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import auth from 'containers/Auth/ducks'

export default (history) => combineReducers({
  router: connectRouter(history),
  auth,
})
