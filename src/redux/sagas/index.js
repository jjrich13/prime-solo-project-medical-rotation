import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import feedbackSaga from './feedbackSaga';
import residentSaga from './residentSaga'


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    feedbackSaga(),
    residentSaga(),
    // watchIncrementAsync()
  ]);
}
