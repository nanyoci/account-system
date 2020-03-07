import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import loginReducer from './loginReducer';

export default combineReducers({
  adminReducer: adminReducer,
  loginReducer: loginReducer
});