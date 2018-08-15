import React, { Component } from 'react';
import { connect } from 'react-redux';

class StudentGoalsTable extends Component {
    constructor(props){
        super(props);
        
    }

    
    render(){
        console.log(this.props.user.details);
        
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

console.log(goal_a_line);

        return(
                <div>
                    <h2>Your Goals</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Procedure</th>
                                <th>Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>IVs</td>
                                <td>#/{goal_iv}</td>
                            </tr>
                            <tr>
                                <td>Arterial Lines</td>
                                <td>#/{goal_a_line}</td>
                            </tr>
                            <tr>
                                <td>Masks Ventilations</td>
                                <td>#/{goal_mask_ventilation}</td>
                            </tr>
                            <tr>
                                <td>LMA Insertions</td>
                                <td>#/{goal_insert_lma}</td>
                            </tr>
                            <tr>
                                <td>Intubations</td>
                                <td>#/{goal_intubation}</td>
                            </tr>
                            <tr>
                                <td>Planned Airway Management</td>
                                <td>#/{goal_planned_airway_management}</td>
                            </tr>
                            <tr>
                                <td>Airway Assessments</td>
                                <td>#/{goal_airway_assessment}</td>
                            </tr>
                            <tr>
                                <td>ASA Assesment Scorings</td>
                                <td>#/{goal_assess_asa_score}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
  });

export default connect(mapStateToProps)(StudentGoalsTable);

StudentGoalsTable
