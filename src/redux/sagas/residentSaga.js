import { put, takeLatest, call } from 'redux-saga/effects';
// import { USER_ACTIONS } from '../actions/userActions';
import axios from 'axios';

const getStudents = () => {
    return axios.get(`/api/resident/students`).then(response => {
        console.log(response.data);
    
        return response.data;
    }).catch( err => {
        console.log(err);
    
    })
}

function* fetchStudents (action) {
    try {
      const studentList = yield getStudents();
      yield put({type: 'SET_STUDENT_LIST', payload: studentList})
    } catch (error) {
      console.log(error);
      
    }
  }


function* residentSaga () {
    yield takeLatest('FETCH_RESIDENT_STUDENT_LIST', fetchStudents);
  }
  
  export default residentSaga;