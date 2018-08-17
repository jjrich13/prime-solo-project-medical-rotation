import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentGoalsTable from '../StudentGoalsTable/StudentGoalsTable'

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
                    <button onClick={this.handleSubmitDailyFeedbackButton}>Submit Daily Feedback</button>
                    <button onClick={this.handleFeedbackHistoryButton}>Feedback History</button>
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