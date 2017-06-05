/*
 *
 * Redux Store
 *
 */

import 'babel-polyfill'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'

import authMiddleware from 'containers/Auth/middleware'

import combinedReducers from './combinedReducers'
import combinedSagas from './combinedSagas'

export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const sagaMiddleware = createSagaMiddleware()
const routingMiddleware = routerMiddleware(history)

const middleware = [sagaMiddleware, routingMiddleware, authMiddleware]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  combinedReducers,
  applyMiddleware(...middleware)
)

combinedSagas.forEach((saga) => {
  sagaMiddleware.run(saga)
})

export default store
