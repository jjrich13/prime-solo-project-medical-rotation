import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import TableRowStudentFeedbackHistory from '../TableRowStudentFeedbackHistory/TableRowStudentFeedbackHistory'

import {Table, TableBody, TableCell, TableHead, TableRow, Typography}  from '@material-ui/core';



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

    componentDidUpdate() {
        //reroute back to login if not logged in user
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('home');
        }
      }

    
    render(){
        console.log(this.props.state.feedback.history);
        
        const tableRows = this.props.state.feedback.history.map((row, index) => {
            return(
                <TableRowStudentFeedbackHistory
                    key={index}
                    date={row.date}
                    discussion_topics_list={row.discussion_topics_list}
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
                <Typography variant="display3">Feedback History</Typography>
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
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    state
  });

export default connect(mapStateToProps)(StudentFeedbackHistory);