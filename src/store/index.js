/*
 *
 * Redux Store
 *
 */

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'

import { createAuthMiddleware } from 'containers/Auth/ducks'
import { localeMiddleware } from 'containers/LanguageProvider/ducks'

import combinedReducers from './combinedReducers'
import combinedSagas from './combinedSagas'

export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const sagaMiddleware = createSagaMiddleware()
const routingMiddleware = routerMiddleware(history)
const authMiddleware = createAuthMiddleware(history)

const middleware = [sagaMiddleware, routingMiddleware, authMiddleware, localeMiddleware]

const __DEV__ = process.env.NODE_ENV !== 'production'

if (__DEV__) {
  middleware.push(createLogger())
}

// redux devtools
const composeEnhancer = __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const enhancer = composeEnhancer(applyMiddleware(...middleware))

const store = createStore(combinedReducers, enhancer)

combinedSagas.forEach((saga) => {
  sagaMiddleware.run(saga)
})

export default store
