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
                    <Typography variant="display2">Feedback Entry</Typography>
                    <Typography variant="headline">{this.state.feedback[0].student_first_name + ' ' + this.state.feedback[0].student_last_name}</Typography>
                    <Typography>{moment(this.state.feedback[0].date).format('dddd, MMMM Do YYYY')}</Typography>
                    <br/>
                    <Typography variant="title">Staff Details</Typography>
                    <Typography>Resident: {this.state.feedback[0].resident_first_name + ' ' + this.state.feedback[0].resident_last_name|| 'No Resident Selected'}</Typography>
                    <Typography>Signed by resident: {this.state.feedback[0].signed_by_resident ? 'Yes':'No'}</Typography>
                    <Typography>Attending Physician: {this.state.feedback[0].attending_physician || 'No Attending Selected'}</Typography>
                    <br/>
                    <Typography variant="title">Discussion Topics</Typography>
                    <Typography variant="subheading">Discussed from last time:</Typography>
                    <div>
                        <i>upcoming</i>
                    </div>
                    <br/>
                    <Typography variant="subheading">For next time:</Typography>
                    <div>
                        {discussionTopicsListItems}
                    </div>
                    <br/>
                    <Typography variant="title">Daily Progress Towards Goals</Typography>
                    <Typography>IVs: {this.state.feedback[0].iv}</Typography>
                    <Typography>Intubations: {this.state.feedback[0].intubation}</Typography>
                    <Typography>Arterial Lines: {this.state.feedback[0].a_line}</Typography>
                    <Typography>Planned Airway Mgmt: {this.state.feedback[0].planned_airway_management}</Typography>
                    <Typography>Mask Ventilations: {this.state.feedback[0].mask_ventilation}</Typography>
                    <Typography>Airway Assessments: {this.state.feedback[0].airway_assessment}</Typography>
                    <Typography>Insert LMAs: {this.state.feedback[0].insert_lma}</Typography>
                    <Typography>Assess ASA Score: {this.state.feedback[0].assess_asa_score}</Typography>
                    <br/>
                    <Typography variant="title">Applied Monitors: {this.state.feedback[0].applied_monitors}</Typography>
                    <Typography>Setup Rooms: {this.state.feedback[0].setup_room}</Typography>
                    <Typography>Planned Induction: {this.state.feedback[0].planned_induction ? 'Yes':'No'}</Typography>
                    <Typography>Preparing Medication: {this.state.feedback[0].preparing_medication}</Typography>
                </div>
            )
        }
    
        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    details: state.resident.details,
});

export default connect(mapStateToProps)(FeedbackEntry);
