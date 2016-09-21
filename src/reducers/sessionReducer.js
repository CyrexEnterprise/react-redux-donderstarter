import { SESSION_PENDING, SESSION_FULFILLED, SESSION_REJECTED } from '../constants/actionTypes';

import initialState from './initialState';

export default function auth(state = initialState.session, action) {

  switch (action.type) {
    case SESSION_PENDING:
      return {
        ...state,
        'isValidating': true,
        'isValidated': false
      };
    case SESSION_FULFILLED:
      return {
        ...state,
        'isValidating': false,
        'isValidated': true,
        data: action.payload.data[0]
      };
    case SESSION_REJECTED:
      return {
        ...state,
        isValidating: false,
        isValidated: false,
        statusText: `Authentication Error: ${action.payload.message}`
      };

    default:
      return state;
  }
}
