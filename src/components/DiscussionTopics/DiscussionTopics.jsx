import React, { Component } from 'react';
import { connect } from 'react-redux';


class DiscussionTopics extends Component{
    constructor(props){
        super(props);
    }

    render(){
        

        return(
            <div>
                <h2>For Tomorrow</h2>
                <p>Select What you'd like to discuss tomorrow with a resident (4 or fewer)</p>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <input type="checkbox" value="Ventilator Settings"/>
                                Ventilator Settings
                            </td>
                            <td>
                                <input type="checkbox" value="Inhaled Agents"/>
                                Inhaled Agents
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" value="Induction Drugs"/>
                                Induction Drugs
                            </td>
                            <td>
                                <input type="checkbox" value="Vasopressors"/>
                                Vasopressors
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" value="Monitors"/>
                                Monitors
                            </td>
                            <td>
                                <input type="checkbox" value="Airway Management"/>
                                Airway Management
                            </td>
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

export default connect(mapStateToProps)(DiscussionTopics)