import { LOGIN_PENDING, LOGIN_FULFILLED, LOGIN_REJECTED } from '../constants/actionTypes';

import initialState from './initialState';

export default function auth(state = initialState.auth, action) {

  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        'isAuthenticating': true,
        'statusText': null
      };
    case LOGIN_FULFILLED:
      return {
        ...state,
        'isAuthenticating': false,
        'isAuthenticated': true,
        'token': action.payload.token,
        'statusText': 'You have been successfully logged in.'
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        statusText: `Authentication Error: ${action.payload.message}`
      };

    default:
      return state;
  }
}
