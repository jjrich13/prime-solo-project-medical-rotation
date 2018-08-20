import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class TableBodyResidentStudentList extends Component {
    constructor(props){
        super(props);
        
    }

    componentDidMount(){
        this.props.dispatch({
            type: 'FETCH_RESIDENT_STUDENT_LIST'
        })
    }

    
    render(){
        console.log(this.props.resident);
        
        return(
            <tbody>
                <tr>
                    <td>
                        Student Name
                    </td>
                    <td>
                        Year
                    </td>
                    <td>
                        Progress
                    </td>
                    <td>
                        Buttons
                    </td>
                </tr>
            </tbody>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    feedback: state.feedback,
    resident: state.resident
});

export default connect(mapStateToProps)(TableBodyResidentStudentList);