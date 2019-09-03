/*
 *
 * Redux Store
 *
 */

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import { createAuthMiddleware } from 'containers/Auth/ducks'

import combinedReducers from './combinedReducers'
import combinedSagas from './combinedSagas'

export const history = createBrowserHistory()

// Build the middleware for intercepting and dispatching navigation actions
const sagaMiddleware = createSagaMiddleware()
const routingMiddleware = routerMiddleware(history)
const authMiddleware = createAuthMiddleware(history)

const middleware = [sagaMiddleware, routingMiddleware, authMiddleware]

const store = createStore(combinedReducers(history), applyMiddleware(...middleware))

combinedSagas.forEach((saga) => {
  sagaMiddleware.run(saga)
})

export default store
