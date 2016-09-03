import { combineReducers } from 'redux';
import users from './usersReducer';
import session from './sessionReducer';
import auth from './authReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  users,
  auth,
  session,
  routing: routerReducer
});

export default rootReducer;
