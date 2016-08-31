import * as actions from '../constants/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.

export default function users(state = initialState.users, action) {

  switch (action.type) {
    case actions.USERS_PENDING:
      return {...state, data: []};

    case actions.USERS_FULFILLED:
      return {...state, data: action.payload.data};

    case actions.USERS_REJECTED:
      return {...state, error: action.payload};

    default:
      return state;
  }
}
