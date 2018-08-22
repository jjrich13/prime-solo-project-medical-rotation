import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import moment from 'moment'


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
                    <tr key={index}>
                        <td>{feedback.first_name + ' ' + feedback.last_name}</td>
                        <td>{moment(feedback.date).format('dddd, MMMM Do YYYY')}</td>
                        <td>{feedback.discussion_topics.map((topic, i ) => {
                                return(
                                    <div key={i}><a href={topic}>Topic {i + 1}</a></div>
                                )
                            })}
                        </td>
                    </tr>
                )
            })
        }
        return(
            <div>
                <Nav />
                <h1>All Feedback</h1>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Student
                            </th>
                            <th>
                                Date
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
            

        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    feedback: state.resident.feedback,
    resident: state.resident
});

export default connect(mapStateToProps)(TableResidentStudentList);