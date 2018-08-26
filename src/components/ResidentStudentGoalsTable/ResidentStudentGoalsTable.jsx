import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';

class ResidentStudentGoalsTable extends Component {
    constructor(props){
        super(props);
        
    }

    componentDidMount(){
        
    }
    
    render(){
        console.log('resident',this.props.resident);
        
        
        const {
            goal_a_line,
            goal_airway_assessment,
            goal_assess_asa_score,
            goal_insert_lma,
            goal_intubation,
            goal_iv,
            goal_mask_ventilation,
            goal_planned_airway_management
        } = this.props.resident.details

        const {
            iv,
            a_line,
            mask_ventilation,
            insert_lma,
            intubation,
            planned_airway_management,
            airway_assessment,
            assess_asa_score
        } = this.props.resident.progress;


        return(
                <div>
                    <Typography variant="display2">{this.props.resident.details.first_name + ' ' + this.props.resident.details.last_name}</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Procedure</TableCell>
                                <TableCell>Progress</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>IVs</TableCell>
                                <TableCell>{iv || 0}/{goal_iv}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Arterial Lines</TableCell>
                                <TableCell>{a_line || 0}/{goal_a_line}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Masks Ventilations</TableCell>
                                <TableCell>{mask_ventilation || 0}/{goal_mask_ventilation}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>LMA Insertions</TableCell>
                                <TableCell>{insert_lma || 0}/{goal_insert_lma}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Intubations</TableCell>
                                <TableCell>{intubation || 0}/{goal_intubation}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Planned Airway Management</TableCell>
                                <TableCell>{planned_airway_management || 0}/{goal_planned_airway_management}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Airway Assessments</TableCell>
                                <TableCell>{airway_assessment || 0}/{goal_airway_assessment}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>ASA Assesment Scorings</TableCell>
                                <TableCell>{assess_asa_score || 0}/{goal_assess_asa_score}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    resident: state.resident,
});

export default connect(mapStateToProps)(ResidentStudentGoalsTable);
