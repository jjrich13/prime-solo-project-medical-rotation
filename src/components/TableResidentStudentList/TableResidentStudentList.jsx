import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class TableResidentStudentList extends Component {
    constructor(props){
        super(props);
        
    }

    componentDidMount(){
        this.props.dispatch({
            type: 'FETCH_RESIDENT_STUDENT_LIST'
        })
    }

    handleProfile = (id) => {
        console.log(id);
        window.location.href= `/#/profile/${id}`;
    }

    deactivateStudent = (id) => {
        axios.put(`/api/admin/toggleActive/${id}`).then(response => {
            this.props.dispatch({
                type: 'FETCH_RESIDENT_STUDENT_LIST'
            })
            this.props.getInactiveStudents();
                
        }).catch(err => {
                console.log(err);
        })
    }

    
    render(){
        console.log(this.props.resident);
        const tableRowArray = this.props.resident.students.map((student, index) => {
            return(
                <tr key={index}>
                    <td>
                        {student.first_name + ' ' + student.last_name}
                    </td>
                    <td>
                        MS{student.year}
                    </td>
                    <td>
                        {Math.round(Number(student.progress_sum) / Number(student.goal_sum)*100)}%
                    </td>
                    <td>
                        {/* button */}
                        <button onClick={() => this.handleProfile(student.id)}>Profile</button>
                        <button onClick={() => this.deactivateStudent(student.id)}>Deactivate</button>
                    </td>
                </tr>
            )
        })
        return(
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
                    {tableRowArray}
                </tbody>
            </table>
            

        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    feedback: state.feedback,
    resident: state.resident
});

export default connect(mapStateToProps)(TableResidentStudentList);