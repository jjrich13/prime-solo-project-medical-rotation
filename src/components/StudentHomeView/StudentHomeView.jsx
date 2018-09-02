import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentGoalsTable from '../StudentGoalsTable/StudentGoalsTable'
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

class StudentHomeView extends Component {
    constructor(props){
        super(props);
        
    }

    handleSubmitDailyFeedbackButton = () => {
        window.location.href= `/#/feedbackform`;
    }

    handleFeedbackHistoryButton = () => {
        window.location.href= `/#/studentfeedbackhistory`;

    }

    componentDidUpdate() {
        //reroute back to login if not logged in user
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('home');
        }
      }

    
    render(){
        console.log('feedback:', this.props.feedback);
        
        return(
            <div>
                <Typography variant="display3">Home</Typography>
                <div>
                    <Button variant="outlined" size="large" onClick={this.handleSubmitDailyFeedbackButton}>Submit Daily Feedback</Button>
                </div>
                <StudentGoalsTable />
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user
  });

export default connect(mapStateToProps)(StudentHomeView);