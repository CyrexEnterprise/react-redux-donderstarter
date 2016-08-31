import {createStore, compose, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const middewares = [
    // Add other middleware on this line...

    // promise middleware
    promiseMiddleware
  ];

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middewares)
    )
  );
}
