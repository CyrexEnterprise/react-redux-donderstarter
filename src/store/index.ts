/*
 * Redux Store
 */

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import Reactotron from 'reactotron-react-js'
import { __DEV__ } from 'constants/env'
import reactotronConfig from 'util/reactotronConfig'

import { authMiddleware } from 'containers/Auth/ducks'

import combinedReducers from './combinedReducers'
import combinedSagas from './combinedSagas'

export const history = createBrowserHistory()

// Build the middleware for intercepting and dispatching navigation actions
const sagaMiddlewareOpts: any = {}

if (__DEV__) {
  sagaMiddlewareOpts.sagaMonitor = (Reactotron as any).createSagaMonitor()
}

const sagaMiddleware = createSagaMiddleware(sagaMiddlewareOpts)
const routingMiddleware = routerMiddleware(history)

const middleware = [sagaMiddleware, routingMiddleware, authMiddleware]

let composedMiddleware

if (__DEV__) {
  composedMiddleware = compose(applyMiddleware(...middleware), (reactotronConfig as any).createEnhancer())
} else {
  composedMiddleware = applyMiddleware(...middleware)
}

const store = createStore(combinedReducers(history), composedMiddleware)

combinedSagas.forEach((saga) => {
  sagaMiddleware.run(saga)
})

export default store
