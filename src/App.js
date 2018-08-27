import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';
import FeedbackForm from './components/FeedbackForm/FeedbackForm'
import StudentFeedbackHistory from './components/StudentFeedbackHistory/StudentFeedbackHistory'
import StudentProfile from './components/StudentProfile/StudentProfile'
import ResidentFeedback from './components/ResidentFeedback/ResidentFeedback'
import AdminView from './components/AdminView/AdminView'

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Rotations" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/info"
          component={InfoPage}
        />
        <Route
          path="/feedbackform"
          component={FeedbackForm}
        />
        
        <Route
          path="/studentfeedbackhistory"
          component={StudentFeedbackHistory}
        />
        <Route
          path="/profile/:id"
          component={StudentProfile}
        />
        <Route
          path="/feedback"
          component={ResidentFeedback}
        />
        <Route
          path="/admin"
          component={AdminView}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
