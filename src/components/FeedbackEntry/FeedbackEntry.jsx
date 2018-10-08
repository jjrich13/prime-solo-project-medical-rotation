import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ResidentStudentGoalsTable from '../ResidentStudentGoalsTable/ResidentStudentGoalsTable'
import InterestsList from '../InterestsList/InterestsList'
import ResidentPastExperienceTable from '../ResidentPastExperienceTable/ResidentPastExperienceTable'
import { Typography } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment'



class FeedbackEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feedback: []
        }
    }
    componentDidMount() {
        axios.get(`/api/feedback/entry/${this.props.match.params.id}`).then(response => {
            this.setState({feedback: response.data})
        }).catch(err => {
            console.log(err);
            
        })
    }

    render() {
        console.log(this.state);
        let discussionTopicsListItems = this.state.feedback.map((feedback, index) => {
            return(
                <div key={index}>
                    <a href={feedback.podcast_link}>{feedback.topic}</a>
                </div>
            )
        })

        let content = null;
        if(this.state.feedback[0]){
            content = (
                <div>
                    <Typography>Feedback Entry</Typography>
                    <Typography>{this.state.feedback[0].first_name + ' ' + this.state.feedback[0].last_name}</Typography>
                    <Typography>{moment(this.state.feedback[0].date).format('dddd, MMMM Do YYYY')}</Typography>
                    <Typography>Discussion Topics for tommorrow:</Typography>
                    <div>
                        {discussionTopicsListItems}
                    </div>
                    <Typography>Feedback Entry</Typography>
                    <Typography>Feedback Entry</Typography>
                    <Typography>Feedback Entry</Typography>
                    <Typography>Feedback Entry</Typography>
                    <Typography>Feedback Entry</Typography>
                    <Typography>Feedback Entry</Typography>
                </div>
            )
        }
    
        return (
            <div>
                <Nav />
                {content}
                {this.props.match.params.id}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    details: state.resident.details,
});

export default connect(mapStateToProps)(FeedbackEntry);
