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
        //Here state is intialized with empty nulls and empty arrays
        //so nothing breaks in the render before the axios call comes back with data
        this.state = {
            feedback: {
                a_line: null,
                airway_assessment: null,
                airway_management: null,
                applied_monitors: null,
                inhaled_agents: null,
                assess_asa_score: 1,
                inhaled_agents: null,
                attending_physician: null,
                inhaled_agents: null,
                date: null,
                inhaled_agents: null,
                discussion_topics: null,
                inhaled_agents: null,
                edited: false,
                inhaled_agents: null,
                feedback_id: null,
                inhaled_agents: null,
                id: null,
                inhaled_agents: null,
                induction_drugs: null,
                inhaled_agents: null,
                insert_lma: null,
                intubation: null,
                iv: null,
                mask_ventilation: null,
                monitors: null,
                planned_airway_management: null,
                planned_induction: null,
                preparing_medication: null,
                read_listened: null,
                resident: null,
                resident_first_name: null,
                resident_last_name: null,
                setup_room: null,
                signed_by_resident: null,
                student_first_name: null,
                student_last_name: null,
                tomorrow_discussion_topics_list: [],
                user_id: null,
                vasopressors: null,
                ventilator_settings: null,
                yesterday_discussion_topics_list: []
            }
        }
    }
    componentDidMount() {
        axios.get(`/api/feedback/entry/${this.props.match.params.id}`).then(response => {
            this.setState({ feedback: response.data })
        }).catch(err => {
            console.log(err);

        })
    }

    render() {
        console.log(this.state);
        let yesterdayDiscussionTopicsList;
        if(this.state.feedback.yesterday_discussion_topics_list != null){
            yesterdayDiscussionTopicsList = this.state.feedback.yesterday_discussion_topics_list.map((topic, index) => {
                return (
                    <div key={index}>
                        <a href={topic.podcast_link}>{topic.topic_name}</a>
                    </div>
                )
            })
        } else {
            yesterdayDiscussionTopicsList = 'None'
        }
        let tomorrowDiscussionTopicsList;
        if(this.state.feedback.tomorrow_discussion_topics_list != null){
            tomorrowDiscussionTopicsList = this.state.feedback.tomorrow_discussion_topics_list.map((topic, index) => {
            return (
                <div key={index}>
                    <a href={topic.podcast_link}>{topic.topic_name}</a>
                </div>
            )
            })
        } else{
            tomorrowDiscussionTopicsList = 'None'
        }

        let content = null;
        if (this.state.feedback.student_first_name) {
            content = (
                <div>
                    <Typography variant="display2">Feedback Entry</Typography>
                    <Typography variant="headline">{this.state.feedback.student_first_name + ' ' + this.state.feedback.student_last_name}</Typography>
                    <Typography>{moment(this.state.feedback.date).format('dddd, MMMM Do YYYY')}</Typography>
                    <br />
                    <Typography variant="title">Staff Details</Typography>
                    <Typography>Resident: {this.state.feedback.resident_first_name + ' ' + this.state.feedback.resident_last_name || 'No Resident Selected'}</Typography>
                    <Typography>Signed by resident: {this.state.feedback.signed_by_resident ? 'Yes' : 'No'}</Typography>
                    <Typography>Resident comments: {this.state.feedback.resident_comment ? <i>{this.state.feedback.resident_comment}</i> : <i>None</i>}</Typography>
                    <Typography>Attending Physician: {this.state.feedback.attending_physician || 'No Attending Selected'}</Typography>
                    <br />
                    <Typography variant="title">Discussion Topics</Typography>
                    <Typography variant="subheading">Discussed today:</Typography>
                    <div>
                        {yesterdayDiscussionTopicsList}
                    </div>
                    <br />
                    <Typography variant="subheading">Topics for next time:</Typography>
                    <div>
                        {tomorrowDiscussionTopicsList}
                    </div>
                    <br />
                    <Typography variant="title">Daily Progress Towards Goals</Typography>
                    <Typography>IVs: {this.state.feedback.iv}</Typography>
                    <Typography>Intubations: {this.state.feedback.intubation}</Typography>
                    <Typography>Arterial Lines: {this.state.feedback.a_line}</Typography>
                    <Typography>Planned Airway Mgmt: {this.state.feedback.planned_airway_management}</Typography>
                    <Typography>Mask Ventilations: {this.state.feedback.mask_ventilation}</Typography>
                    <Typography>Airway Assessments: {this.state.feedback.airway_assessment}</Typography>
                    <Typography>Insert LMAs: {this.state.feedback.insert_lma}</Typography>
                    <Typography>Assess ASA Score: {this.state.feedback.assess_asa_score}</Typography>
                    <br />
                    <Typography variant="title">Applied Monitors: {this.state.feedback.applied_monitors}</Typography>
                    <Typography>Setup Rooms: {this.state.feedback.setup_room}</Typography>
                    <Typography>Planned Induction: {this.state.feedback.planned_induction ? 'Yes' : 'No'}</Typography>
                    <Typography>Preparing Medication: {this.state.feedback.preparing_medication}</Typography>
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
