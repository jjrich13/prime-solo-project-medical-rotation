import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {Table, TableBody, TableCell, TableHead, TableRow, Button, withStyles, Typography}  from '@material-ui/core';

const styles = {
    cell: {
        width: '8%'
    },
    table: {
        width: '70%'
    },
    name :{
        color: 'blue'
    }
}
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
        const tableRowArray = this.props.resident.students.map((student, index) => {
            return(
                <TableRow 
                    key={index}
                    onClick={() => this.handleProfile(student.id)}
                    hover={true}
                >
                    <TableCell className={this.props.classes.cell}>
                        <Typography >{student.first_name + ' ' + student.last_name}</Typography>
                    </TableCell>
                    <TableCell className={this.props.classes.cell}>
                        MS{student.year}
                    </TableCell>
                    <TableCell className={this.props.classes.cell}>
                        {Math.round(Number(student.progress_sum) / Number(student.goal_sum)*100)}%
                    </TableCell>
                    <TableCell>
                        {/* button */}
                        {/* <Button variant="outlined"  onClick={() => this.handleProfile(student.id)}>Profile</Button> */}
                        <Button  onClick={() => this.deactivateStudent(student.id)}>Deactivate</Button>
                    </TableCell>
                </TableRow>
            )
        })
        return(
            <Table className={this.props.classes.table}>
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

export default connect(mapStateToProps)(withStyles(styles)(TableResidentStudentList));