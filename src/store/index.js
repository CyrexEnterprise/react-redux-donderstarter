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
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import firebase from 'firebase/app'

import { createAuthMiddleware } from 'containers/Auth/ducks'

import combinedReducers from './combinedReducers'
import combinedSagas from './combinedSagas'

import {
  firebaseApiKey,
  firebaseAuthDomain,
  firebaseDatabaseURL,
  firebaseProjectId,
  firebaseStorageBucket,
  firebaseMessagingSenderId
} from 'constants/global'

export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const sagaMiddleware = createSagaMiddleware()
const routingMiddleware = routerMiddleware(history)
const authMiddleware = createAuthMiddleware(history)

const middleware = [sagaMiddleware, routingMiddleware, authMiddleware]

const __DEV__ = process.env.NODE_ENV !== 'production'

if (__DEV__) {
  middleware.push(createLogger())
}

// Firebase config
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  databaseURL: firebaseDatabaseURL,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId
}
firebase.initializeApp(firebaseConfig)

// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false // enable/disable Firebase's database logging
}

// redux devtools
const composeEnhancer = __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const enhancer = composeEnhancer(applyMiddleware(...middleware))

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config)
)(createStore)

const store = createStoreWithFirebase(combinedReducers, enhancer)

combinedSagas.forEach((saga) => {
  sagaMiddleware.run(saga, getFirebase)
})

export default store
