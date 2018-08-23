import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
                <TableRow key={index}>
                    <TableCell>
                        {student.first_name + ' ' + student.last_name}
                    </TableCell>
                    <TableCell>
                        MS{student.year}
                    </TableCell>
                    <TableCell>
                        {Math.round(Number(student.progress_sum) / Number(student.goal_sum)*100)}%
                    </TableCell>
                    <TableCell>
                        {/* button */}
                        <button onClick={() => this.handleProfile(student.id)}>Profile</button>
                        <button onClick={() => this.deactivateStudent(student.id)}>Deactivate</button>
                    </TableCell>
                </TableRow>
            )
        })
        return(
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Student
                        </TableCell>
                        <TableCell>
                            Year
                        </TableCell>
                        <TableCell>
                            Progress
                        </TableCell>
                        <TableCell>
                            Info
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRowArray}
                </TableBody>
            </Table>
            

        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    feedback: state.feedback,
    resident: state.resident
});

export default connect(mapStateToProps)(TableResidentStudentList);