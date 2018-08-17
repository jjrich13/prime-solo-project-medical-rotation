import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import TableRowStudentFeedbackHistory from '../TableRowStudentFeedbackHistory/TableRowStudentFeedbackHistory'



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
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Date
                                </th>
                                <th>
                                    Tasks Completed towards Goal
                                </th>
                                <th>
                                    Discussion Points
                                </th>
                                <th>
                                    Info
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                    </table>
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