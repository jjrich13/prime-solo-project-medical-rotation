import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import moment from 'moment'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class TableRowStudentFeedbackHistory extends Component {
    constructor(props){
        super(props);
        
    }

    
    render(){
        console.log(this.props.progress);
        
        const discussion_topics = this.props.discussion_topics.map((topic, index ) => {
            return(
                <div key={index}><a href={topic}>Topic {index + 1}</a></div>
            )
        })
        
        return(
            <TableRow>
                <TableCell>
                    
                    {moment(this.props.date).format('dddd, MMMM Do YYYY')}
                </TableCell>
                <TableCell>
                    {this.props.progress}
                </TableCell>
                <TableCell>
                    {discussion_topics}
                </TableCell>
                <TableCell>
                    Info
                </TableCell>
            </TableRow>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    state
  });

export default connect(mapStateToProps)(TableRowStudentFeedbackHistory);