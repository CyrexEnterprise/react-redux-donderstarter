import {createStore, compose, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';

import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const middewares = [
    // Add other middleware on this line...

    // promise middleware
    promise(),

    // allows for actions: push, replace, go, goBack, goForward
    routerMiddleware(browserHistory),
  ];

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middewares)
    )
  );
}
