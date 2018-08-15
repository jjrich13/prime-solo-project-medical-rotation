import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import Questionnaire from '../Questionnaire/Questionnaire'
import StudentHomeView from '../StudentHomeView/StudentHomeView'
import ResidentHomeView from '../ResidentHomeView/ResidentHomeView'


import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user
});
// let userContent = null;
class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER }); //this goes to userSaga gives us access to userName and id on redux state
    
    this.props.dispatch({type:USER_ACTIONS.CHECK_INTRO});
    this.props.dispatch({type:USER_ACTIONS.FETCH_USER_DETAILS})
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


  
  // setContent = () => {
  //   if(this.props.user.details.resident){
  //     userContent = <ResidentHomeView />
  //   } else if (typeof this.props.user.questionnaire[0] !== 'object' && !this.props.user.details.resident){
  //     userContent = <Questionnaire setContent={this.setContent}/>
  //   } else {
  //     userContent = <StudentHomeView />
  //   }
  // }

  render() {
    console.log('from render:', this.props.user.details.resident);
    
    let content = null;
    // this.setContent();
    let userContent = null;

    // SQL returns an empty array if there is no match for the questionnaire, this is checking for that
    if(this.props.user.details.resident){
      userContent = <ResidentHomeView />
    } else if (!this.props.user.details.intubations && !this.props.user.details.resident){
      userContent = <Questionnaire fetchDetails={this.fetchDetails}/>
    } else {
      userContent = <StudentHomeView />
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

    <pre>{JSON.stringify(this.props, null, 2)}</pre>
          {userContent}
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

