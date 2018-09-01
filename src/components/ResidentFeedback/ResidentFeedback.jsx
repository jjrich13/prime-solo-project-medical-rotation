import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import moment from 'moment'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Typography} from '@material-ui/core';

class TableResidentStudentList extends Component {
    constructor(props){
        super(props);
        
    }

    componentDidMount(){
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({
            type: 'FETCH_FEEDBACK'
        })

    }

    // componentDidUpdate() {
    //     //reroute back to login if not logged in user
    //     if (!this.props.user.isLoading && !this.props.user.details.resident) {
    //       this.props.history.push('home');
    //     }
    // }

    
    render(){
        console.log(this.props.feedback);
        
        let tableRows = []
        if (this.props.feedback){
            tableRows = this.props.feedback.map((feedback,index) => {
                return(
                    <TableRow key={index}>
                        <TableCell>{feedback.first_name + ' ' + feedback.last_name}</TableCell>
                        <TableCell>{moment(feedback.date).format('dddd, MMMM Do YYYY')}</TableCell>
                        <TableCell>{feedback.discussion_topics_list.map((topic, i ) => {
                                return(
                                    <div key={i}><a href={topic.podcast_link}>{topic.topic_name}</a></div>
                                )
                            })}
                        </TableCell>
                    </TableRow>
                )
            })
        }
        return(
            <div>
                <Nav />
                <Typography variant="display3">All Feedback</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Student
                            </TableCell>
                            <TableCell>
                                Date
                            </TableCell>
                            <TableCell>
                                Discussion Points
                            </TableCell>
                            {/* <TableCell>
                                Info
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRows}
                    </TableBody>
                </Table>
            </div>
            

        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    feedback: state.resident.feedback,
    resident: state.resident
});

export default connect(mapStateToProps)(TableResidentStudentList);