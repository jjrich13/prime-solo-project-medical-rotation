import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ResidentStudentGoalsTable from '../ResidentStudentGoalsTable/ResidentStudentGoalsTable'


class StudentProfile extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }


  render() {
      console.log(this.props.user);
      
    return (
      <div>
        <Nav />
        <p>Hello</p>
        {this.props.match.params.id}
        <ResidentStudentGoalsTable studentId={this.props.match.params.id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
    user: state.user,
  });

export default connect(mapStateToProps)(StudentProfile);
