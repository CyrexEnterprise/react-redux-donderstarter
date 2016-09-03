import { SESSION_PENDING, SESSION_FULFILLED, SESSION_REJECTED } from '../constants/actionTypes';

import initialState from './initialState';

export default function auth(state = initialState.session, action) {

  switch (action.type) {
    case SESSION_PENDING:
      return {
        ...state,
        'isValidating': true,
        'statusText': null
      };
    case SESSION_FULFILLED:
      return {
        ...state,
        'isValidating': true,
        'isValidated': true,
        'user': 'someUser'
      };
    case SESSION_REJECTED:
      return {
        ...state,
        statusText: `Authentication Error: ${action.payload.message}`
      };

    default:
      return state;
  }
}
