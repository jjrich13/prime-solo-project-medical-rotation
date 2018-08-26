import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Table, TableBody, TableCell, TableHead, TableRow, Typography, withStyles}  from '@material-ui/core';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';

const styles = {
    cell: {
        width: '15%'
    },
    table: {
        width: '70%'
    }
}

class StudentGoalsTable extends Component {
    constructor(props){
        super(props);
        
    }

    componentDidMount(){
        this.props.dispatch({type:'GET_GOALS_PROGRESS'})
    }
    
    render(){
        
const {
    goal_a_line,
    goal_airway_assessment,
    goal_assess_asa_score,
    goal_insert_lma,
    goal_intubation,
    goal_iv,
    goal_mask_ventilation,
    goal_planned_airway_management
} = this.props.user.details

const {
    iv,
    a_line,
    mask_ventilation,
    insert_lma,
    intubation,
    planned_airway_management,
    airway_assessment,
    assess_asa_score
} = this.props.feedback.progress

        return(
                <div>
                    <Typography variant="display2">Your Goals</Typography>
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={this.props.classes.cell}>Procedure</TableCell>
                                <TableCell className={this.props.classes.cell}>Progress</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>IVs</TableCell>
                                <TableCell>Completed {iv || 0} of {goal_iv}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Arterial Lines</TableCell>
                                <TableCell>Completed {a_line || 0} of {goal_a_line}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Masks Ventilations</TableCell>
                                <TableCell>Completed {mask_ventilation || 0} of {goal_mask_ventilation}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>LMA Insertions</TableCell>
                                <TableCell>Completed {insert_lma || 0} of {goal_insert_lma}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Intubations</TableCell>
                                <TableCell>Completed {intubation || 0} of {goal_intubation}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Planned Airway Management</TableCell>
                                <TableCell>Completed {planned_airway_management || 0} of {goal_planned_airway_management}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Airway Assessments</TableCell>
                                <TableCell>Completed {airway_assessment || 0} of {goal_airway_assessment}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>ASA Assesment Scorings</TableCell>
                                <TableCell>Completed {assess_asa_score || 0} of {goal_assess_asa_score}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    feedback: state.feedback,
});

export default connect(mapStateToProps)(withStyles(styles)(StudentGoalsTable));
