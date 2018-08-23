import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentGoalsTable from '../StudentGoalsTable/StudentGoalsTable'
import Button from '@material-ui/core/Button';

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

    
    render(){
        console.log('feedback:', this.props.feedback);
        
        return(
            <div>
                <h1>STUDENT HOME</h1>
                <div>
                    <Button variant="outlined" size="large" onClick={this.handleSubmitDailyFeedbackButton}>Submit Daily Feedback</Button>
                    <Button variant="outlined" size="large" onClick={this.handleFeedbackHistoryButton}>Feedback History</Button>
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