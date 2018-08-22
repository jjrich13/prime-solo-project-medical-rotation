import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import moment from 'moment'

class TableRowStudentFeedbackHistory extends Component {
    constructor(props){
        super(props);
        
    }

    
    render(){
        console.log(this.props.progress);
        
        const discussion_topics = this.props.discussion_topics.map((topic, index ) => {
            return(
                <div><a href={topic}>Topic {index + 1}</a></div>
            )
        })
        
        return(
            <tr>
                <td>
                    
                    {moment(this.props.date).format('dddd, MMMM Do YYYY')}
                </td>
                <td>
                    {this.props.progress}
                </td>
                <td>
                    {discussion_topics}
                </td>
                <td>
                    Info
                </td>
            </tr>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    state
  });

export default connect(mapStateToProps)(TableRowStudentFeedbackHistory);