import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                                <td>{iv}/{goal_iv}</td>
                            </tr>
                            <tr>
                                <td>Arterial Lines</td>
                                <td>{a_line}/{goal_a_line}</td>
                            </tr>
                            <tr>
                                <td>Masks Ventilations</td>
                                <td>{mask_ventilation}/{goal_mask_ventilation}</td>
                            </tr>
                            <tr>
                                <td>LMA Insertions</td>
                                <td>{insert_lma}/{goal_insert_lma}</td>
                            </tr>
                            <tr>
                                <td>Intubations</td>
                                <td>{intubation}/{goal_intubation}</td>
                            </tr>
                            <tr>
                                <td>Planned Airway Management</td>
                                <td>{planned_airway_management}/{goal_planned_airway_management}</td>
                            </tr>
                            <tr>
                                <td>Airway Assessments</td>
                                <td>{airway_assessment}/{goal_airway_assessment}</td>
                            </tr>
                            <tr>
                                <td>ASA Assesment Scorings</td>
                                <td>{assess_asa_score}/{goal_assess_asa_score}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    feedback: state.feedback,
  });

export default connect(mapStateToProps)(StudentGoalsTable);

StudentGoalsTable
