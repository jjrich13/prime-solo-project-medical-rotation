import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

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
                    {this.props.date}
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