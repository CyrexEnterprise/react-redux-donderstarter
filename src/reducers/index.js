import { combineReducers } from 'redux';
import users from './usersReducer';
import auth from './auth';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  users,
  auth,
  routing: routerReducer
});

export default rootReducer;
