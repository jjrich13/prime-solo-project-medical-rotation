import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import feedback from './feedbackReducer'

const store = combineReducers({
  user,
  login,
  feedback
});

export default store;
