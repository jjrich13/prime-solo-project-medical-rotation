import { put, takeLatest, call } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';
import axios from 'axios';

function* postFeedback (action) {
    try {
      yield call(axios.post, `/api/feedback`, action.payload);
    } catch (error) {
      console.log(error);
      
    }
  }

function* feedbackSaga () {
    yield takeLatest('POST_FEEDBACK', postFeedback);
  }
  
  export default feedbackSaga;