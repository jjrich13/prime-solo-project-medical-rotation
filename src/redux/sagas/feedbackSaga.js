import { put, takeLatest, call } from 'redux-saga/effects';
// import { USER_ACTIONS } from '../actions/userActions';
import axios from 'axios';

function* postFeedback (action) {
    try {
      yield call(axios.post, `/api/feedback`, action.payload);
    } catch (error) {
      console.log(error);
      
    }
  }


const getGoalsProgress = () => {
    return axios.get(`/api/feedback/goals`).then(response => {
        console.log(response.data);
    
        return response.data;
    }).catch( err => {
        console.log(err);
    
    })
}
  
function* goalsProgress() {
    try {
        const progress = yield getGoalsProgress();
        console.log(progress);
        yield put({
            type: 'SET_PROGRESS',
            payload: progress
        })
    } catch (error) {
        console.log(error);
      
    }
}

const getFeedbackHistory = () => {
    return axios.get(`/api/feedback/history`).then(response => {
    
        return response.data;
    }).catch( err => {
        console.log(err);
    
    })
}

function* fetchFeedbackHistory() {
    try {
        const history = yield getFeedbackHistory();
        yield put({
            type: 'SET_FEEDBACK_HISTORY',
            payload: history
        })
    } catch (error) {
        console.log(error);
      
    }
}

function* feedbackSaga () {
    yield takeLatest('POST_FEEDBACK', postFeedback);
    yield takeLatest('GET_GOALS_PROGRESS', goalsProgress);
    yield takeLatest('FETCH_FEEDBACK_HISTORY', fetchFeedbackHistory)
  }
  
  export default feedbackSaga;