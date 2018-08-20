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

const getGoalsProgress = (id) => {
    return axios.get(`/api/resident/progress/${id}`).then(response => {
        console.log(response.data);
    
        return response.data;
    }).catch( err => {
        console.log(err);
    
    })
}

function* fetchGoalsProgress (action) {
    try {
      const progress = yield getGoalsProgress(action.payload);
      yield put({type: 'SET_GOALS_PROGRESS', payload: progress})
    } catch (error) {
      console.log(error);
      
    }
}

const getInitialDetails = (id) => {
    return axios.get(`/api/resident/initialDetails/${id}`).then(response => {
        console.log(response.data);
    
        return response.data;
    }).catch( err => {
        console.log(err);
    
    })
}

function* fetchInitialDetails (action) {
    try {
      const details = yield getInitialDetails(action.payload);
      yield put({type: 'SET_INITIAL_DETAILS', payload: details})
    } catch (error) {
      console.log(error);
      
    }
}


function* residentSaga () {
    yield takeLatest('FETCH_RESIDENT_STUDENT_LIST', fetchStudents);
    yield takeLatest('RESIDENT_FETCH_GOALS_PROGRESS', fetchGoalsProgress )
    yield takeLatest('RESIDENT_FETCH_INITIAL_DETAILS', fetchInitialDetails )
  }
  
  export default residentSaga;