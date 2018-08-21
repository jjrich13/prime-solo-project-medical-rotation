import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ResidentStudentGoalsTable from '../ResidentStudentGoalsTable/ResidentStudentGoalsTable'
import InterestsList from '../InterestsList/InterestsList'
import ResidentPastExperienceTable from '../ResidentPastExperienceTable/ResidentPastExperienceTable'


class StudentProfile extends Component {
  componentDidMount() {
    this.props.dispatch({
        type:'RESIDENT_FETCH_INITIAL_DETAILS',
        payload: this.props.match.params.id
    })
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({
        type:'RESIDENT_FETCH_GOALS_PROGRESS',
        payload: this.props.match.params.id
    })
    
  }


  render() {
      console.log(this.props.user);
    let vent = 'HAS NOT'
    if(this.props.details.run_ventilator){
        let vent = 'HAS'
    }
      
    return (
      <div>
        <Nav />
        <ResidentStudentGoalsTable studentId={this.props.match.params.id} />
        <h3>Details</h3>
        <p>Year: MS{this.props.details.year}</p>
        <p>Interests: <InterestsList /></p>
        <p>Interested in a Letter of Recommendation: {this.props.details.letter_interest}</p>
        <p>Past Experience with live patients:</p>
        <ResidentPastExperienceTable />
        <p>This student {vent} previously run a ventilator</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    user: state.user,
    details: state.resident.details,
  });

export default connect(mapStateToProps)(StudentProfile);
