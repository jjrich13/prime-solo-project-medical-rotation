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

const progress = (state = {}, action) => {
    switch (action.type) {
      case 'SET_GOALS_PROGRESS':
        return action.payload;
      default:
        return state;
    }
};

const details = (state = {}, action) => {
    switch (action.type) {
      case 'SET_INITIAL_DETAILS':
        return action.payload;
      default:
        return state;
    }
};

export default combineReducers({
    students,
    progress,
    details
});
