import { combineReducers } from 'redux';
// import { USER_ACTIONS } from '../actions/userActions';

const progress = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PROGRESS':
      return action.payload;
    default:
      return state;
  }
};

const history = (state = [], action) => {
    switch (action.type) {
      case 'SET_FEEDBACK_HISTORY':
        return action.payload;
      default:
        return state;
    }
};


export default combineReducers({
  progress,
  history
});
