import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';


class TableResidentStudentList extends Component {
    constructor(props){
        super(props);
        
    }

    componentDidMount(){
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    
    render(){
        console.log(this.props.user);
        
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
                                Year
                            </th>
                            <th>
                                Progress
                            </th>
                            <th>
                                Info
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            

        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    feedback: state.feedback,
    resident: state.resident
});

export default connect(mapStateToProps)(TableResidentStudentList);