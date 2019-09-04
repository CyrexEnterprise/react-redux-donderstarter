/*
 * Combine all reducers in the this file and export them.
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import auth from 'containers/Auth/ducks'

export default (history: History<any>) => combineReducers({
  router: connectRouter(history),
  auth,
})
