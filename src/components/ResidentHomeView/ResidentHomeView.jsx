import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TableResidentStudentList from '../TableResidentStudentList/TableResidentStudentList'
import { USER_ACTIONS } from '../../redux/actions/userActions';

import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';
class ResidentHomeView extends Component {
    constructor(props){
        super(props);
        this.state = {
            residentCode: ''
        }
        
    }

    componentDidMount(){
        axios.get('/api/resident/code').then(response => {
            this.setState({
                residentCode: response.data
            })
            
        })
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    handleViewFeedback = () => {
        window.location.href= `/#/feedback`;
    }
    
    render(){
        return(
            <div>
                <Typography variant="display3">Resident Home</Typography>
                <Typography variant="headline">Resident Code: {this.state.residentCode}</Typography>
                <Typography variant="caption">For signing your students' feedback forms</Typography>
                <br/>
                <Button variant="outlined" size="large" onClick={this.handleViewFeedback}>View All Feedback</Button>
                <TableResidentStudentList />
            </div>
        )
    }
}

export default connect()(ResidentHomeView);