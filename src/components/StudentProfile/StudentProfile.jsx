import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ResidentStudentGoalsTable from '../ResidentStudentGoalsTable/ResidentStudentGoalsTable'
import InterestsList from '../InterestsList/InterestsList'
import ResidentPastExperienceTable from '../ResidentPastExperienceTable/ResidentPastExperienceTable'
import { Typography } from '@material-ui/core';



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
        <br/>
        <Typography variant="display1">Details</Typography>
        <Typography>Year: <Typography variant="caption">MS{this.props.details.year}</Typography></Typography>
        <Typography>Email Address: <Typography variant="caption">{this.props.details.email}</Typography></Typography>
        <Typography>Interests: <InterestsList /></Typography>
        <Typography>Interested in a Letter of Recommendation: <Typography variant="caption">{this.props.details.letter_interest}</Typography></Typography>
        <br/>
        <Typography variant="headline">Past Experience with live patients:</Typography>
        <ResidentPastExperienceTable />
        <br/>
        <Typography>This student {vent} previously run a ventilator</Typography>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    user: state.user,
    details: state.resident.details,
  });

export default connect(mapStateToProps)(StudentProfile);
