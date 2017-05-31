/*
 *
 * Redux Store
 *
 */

import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'

import combinedReducers from './combinedReducers'

export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const routingMiddleware = routerMiddleware(history)
const logger = createLogger()

const store = createStore(
  combinedReducers,
  applyMiddleware(routingMiddleware, logger)
)

export default store
