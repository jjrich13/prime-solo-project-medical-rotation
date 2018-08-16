import { put, takeLatest, takeEvery, call } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';
import { callUser } from '../requests/userRequests';
import axios from 'axios';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    yield put({ type: USER_ACTIONS.REQUEST_START });
    const user = yield callUser(); //this sets action.payload essentially, function is in userRequests
    yield put({
      type: USER_ACTIONS.SET_USER,
      user,
    });
    yield put({
      type: USER_ACTIONS.REQUEST_DONE,
    });
  } catch (error) {
    yield put({
      type: USER_ACTIONS.REQUEST_DONE,
    });
    yield put({
      type: USER_ACTIONS.USER_FETCH_FAILED,
      message: error.data || "FORBIDDEN",
    });
  }
}

const getUserDetails = () => {
  return axios.get(`/api/user/details`).then(response => {
    console.log(response.data);
    
    return response.data;
  }).catch( err => {
    console.log(err);
    
  })
}

function* fetchUserDetails() {
  console.log('1');
  
  try {
    const details = yield getUserDetails();
    console.log(details);
    
    yield put({
      type: 'SET_DETAILS',
      payload: details
    })
  } catch (error) {
    console.log(error);
    
  }
}

const getIntroData = () => {
  return axios.get(`/api/user/intro`).then(response => response.data
  ).catch( err => {
    return 'incomplete';
    
  })
}

function* checkIntro() {
  try {
    const data = yield getIntroData();
    console.log(data);
    
    yield put({
      type: 'SET_GOALS',
      payload: data
    })
  } catch (error) {
    console.log(error);
    
  }
}

function* postQuestionnaire (action) {
  try {
    yield call(axios.post, `/api/user/intro/questionnaire`, action.payload);
    yield call(axios.post, `/api/user/intro/goals`, action.payload);
    yield put({type: USER_ACTIONS.FETCH_USER_DETAILS});
  } catch (error) {
    console.log(error);
    
  }
}
/*
  Starts fetchUser on each dispatched `FETCH_USER` action.
  Allows concurrent fetches of user.
*/
// function* userSaga() {
//   yield takeEvery('FETCH_USER', fetchUser);
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "FETCH_USER" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* userSaga() {
  yield takeEvery(USER_ACTIONS.FETCH_USER, fetchUser);
  yield takeEvery(USER_ACTIONS.CHECK_INTRO, checkIntro)
  yield takeEvery('POST_QUESTIONNAIRE', postQuestionnaire)
  yield takeEvery(USER_ACTIONS.FETCH_USER_DETAILS, fetchUserDetails)
}

export default userSaga;
