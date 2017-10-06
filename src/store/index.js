/*
 *
 * Redux Store
 *
 */

import 'babel-polyfill'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'

import authMiddleware from 'containers/Auth/middleware'
import languageProviderMiddleware from 'containers/LanguageProvider/middleware'

import combinedReducers from './combinedReducers'
import combinedSagas from './combinedSagas'

export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const sagaMiddleware = createSagaMiddleware()
const routingMiddleware = routerMiddleware(history)

const middleware = [sagaMiddleware, routingMiddleware, authMiddleware, languageProviderMiddleware]

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
