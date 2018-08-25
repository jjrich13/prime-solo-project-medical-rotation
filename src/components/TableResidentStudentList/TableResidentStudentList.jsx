import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {Table, TableBody, TableCell, TableHead, TableRow, Button}  from '@material-ui/core';

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
                        <Button variant="outlined"  onClick={() => this.handleProfile(student.id)}>Profile</Button>
                        <Button variant="outlined"  onClick={() => this.deactivateStudent(student.id)}>Deactivate</Button>
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