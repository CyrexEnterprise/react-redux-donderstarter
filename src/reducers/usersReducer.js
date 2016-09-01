import { USERS_PENDING, USERS_FULFILLED, USERS_REJECTED } from '../constants/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.

export default function users(state = initialState.users, action) {

  switch (action.type) {
    case USERS_PENDING:
      return {...state, data: [] };

    case USERS_FULFILLED:
      return {...state, data: action.payload.data };

    case USERS_REJECTED:
      return {...state, error: action.payload };

    default:
      return state;
  }
}
