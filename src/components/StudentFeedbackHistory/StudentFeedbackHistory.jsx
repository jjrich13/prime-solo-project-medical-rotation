import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import TableRowStudentFeedbackHistory from '../TableRowStudentFeedbackHistory/TableRowStudentFeedbackHistory'

import {Table, TableBody, TableCell, TableHead, TableRow}  from '@material-ui/core';



class StudentFeedbackHistory extends Component {
    constructor(props){
        super(props);
        
    }

    componentDidMount(){
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER })
        this.props.dispatch({
            type: 'FETCH_FEEDBACK_HISTORY',
            payload: this.props.user.id
        })
    }

    
    render(){
        console.log(this.props.state.feedback.history);
        
        const tableRows = this.props.state.feedback.history.map((row, index) => {
            return(
                <TableRowStudentFeedbackHistory
                    key={index}
                    date={row.date}
                    discussion_topics={row.discussion_topics}
                    progress = {
                        row.iv +
                        row.a_line +
                        row.mask_ventilation +
                        row.insert_lma +
                        row.planned_airway_management +
                        row.airway_assessment +
                        row.assess_asa_score
                    }
                />
            )
        })
        return(
            <div>
                <Nav />
                <h1>Feedback History</h1>
                <div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Date
                                </TableCell>
                                <TableCell>
                                    Tasks Completed towards Goal
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
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    state
  });

export default connect(mapStateToProps)(StudentFeedbackHistory);