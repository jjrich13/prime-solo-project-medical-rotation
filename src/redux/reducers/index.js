import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import feedback from './feedbackReducer'
import resident from './residentReducer'

const store = combineReducers({
  user,
  login,
  feedback,
  resident
});

export default store;
