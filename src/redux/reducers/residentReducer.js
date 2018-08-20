import { combineReducers } from 'redux';
// import { USER_ACTIONS } from '../actions/userActions';

const students = (state = [], action) => {
  switch (action.type) {
    case 'SET_STUDENT_LIST':
      return action.payload;
    default:
      return state;
  }
};



export default combineReducers({
    students,
});
