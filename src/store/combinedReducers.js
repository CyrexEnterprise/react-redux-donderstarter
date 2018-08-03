/*
 *
 * Combine all reducers in the this file
 * and export them.
 *
 */

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { firebaseReducer } from 'react-redux-firebase'

import auth from 'containers/Auth/ducks'

export default combineReducers({
  routing,
  auth,
  firebase: firebaseReducer
})
