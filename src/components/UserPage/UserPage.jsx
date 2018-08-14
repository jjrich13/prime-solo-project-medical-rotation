import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import Questionnaire from '../Questionnaire/Questionnaire'

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
});

class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER }); //this goes to userSaga gives us access to userName and id on redux state
    
    this.props.dispatch({type:USER_ACTIONS.CHECK_INTRO});
  }

  componentDidUpdate() {
    //reroute back to login if not logged in user
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render() {
    console.log(...this.props.user.questionnaire);
    let content = null;
    let questionnaire = null;

    if ((typeof this.props.user.questionnaire[0] != 'object')){
      questionnaire = <Questionnaire />
    }

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
          {questionnaire}
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

