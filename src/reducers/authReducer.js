import { AUTH_PENDING, AUTH_FULFILLED, AUTH_REJECTED} from '../constants/actionTypes';

import initialState from './initialState';

export default function auth(state = initialState.auth, action) {

  switch (action.type) {
    case AUTH_PENDING:
      return {
        ...state,
        'isAuthenticating': true,
        'statusText': null
      };
    case AUTH_FULFILLED:
      return {
        ...state,
        'isAuthenticating': false,
        'isAuthenticated': true,
        'token': action.payload.token,
        'statusText': 'You have been successfully logged in.'
      };
    case AUTH_REJECTED:
      return {
        ...state,
        statusText: `Authentication Error: ${action.payload.message}`
      };

    default:
      return state;
  }
}
