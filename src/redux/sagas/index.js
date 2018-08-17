import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import feedbackSaga from './feedbackSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    feedbackSaga(),
    // watchIncrementAsync()
  ]);
}
