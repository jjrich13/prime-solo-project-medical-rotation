import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ResidentStudentGoalsTable from '../ResidentStudentGoalsTable/ResidentStudentGoalsTable'
import InterestsList from '../InterestsList/InterestsList'
import ResidentPastExperienceTable from '../ResidentPastExperienceTable/ResidentPastExperienceTable'
import { Typography } from '@material-ui/core';
import axios from 'axios';



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
    
        return (
            <div>
                <Nav />
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
