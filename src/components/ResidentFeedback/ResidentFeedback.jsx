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
                        <TableCell>{feedback.discussion_topics.map((topic, i ) => {
                                return(
                                    <div key={i}><a href={topic}>Topic {i + 1}</a></div>
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
                <h1>All Feedback</h1>
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
                            <TableCell>
                                Info
                            </TableCell>
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