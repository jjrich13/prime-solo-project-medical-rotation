import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import DiscussionTopics from '../DiscussionTopics/DiscussionTopics'


class FeedbackForm extends Component {
    constructor(props){
        super(props);
        
    }

    
    render(){
        console.log(this.props.user.details);
        
        return(
            <div>
                <Nav />
                <h1>Daily Feedback</h1>
                <div>
                    <div>
                        Date For which you are filling out feedback <br/>
                        <input type="date"/>
                    </div>
                    <div>
                        Which resident did you work with today? <br/>
                        <select>
                        <option disabled selected="selected">-Resident-</option>
                        </select>
                    </div>
                    <div>
                        If you DID NOT work with a resident today, who was the attending physician? <br/>
                        <select>
                        <option disabled selected="selected">-Attending-</option>
                        </select>
                    </div>
                    <div>
                        <h2>Discussion Points</h2>
                        <p>Check the box if discussed</p>
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
                    <div>
                        <h2>Performed</h2>
                        <p>How many times did you do each of these today?</p>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        IV<br/>
                                        <input type="number"/>
                                    </td>
                                    <td>
                                        Intubation<br/>
                                        <input type="number"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Arterial Lines<br/>
                                        <input type="number"/>
                                    </td>
                                    <td>
                                        Planned Airway Management<br/>
                                        <input type="number"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Mask Ventilation<br/>
                                        <input type="number"/>
                                    </td>
                                    <td>
                                        Airway Assessment<br/>
                                        <input type="number"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Insert LMA<br/>
                                        <input type="number"/>
                                    </td>
                                    <td>
                                        Assess ASA Score <br/>
                                        <input type="number"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h2>Did you...</h2>
                        <p>Did you do the following, today?</p>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        Applied Monitors <br/>
                                        <select>
                                            <option disabled selected="selected">-Select-</option>
                                            <option value="None">None</option>
                                            <option value="Some">Some</option>
                                            <option value="Most">Most</option>
                                            <option value="All">All</option>
                                        </select>
                                    </td>
                                    <td>
                                        Setup Room<br/>
                                        <select>
                                            <option disabled selected="selected">-Select-</option>
                                            <option value="None">None</option>
                                            <option value="Some">Some</option>
                                            <option value="Most">Most</option>
                                            <option value="All">All</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Planned Induction<br/>
                                        Yes <input name="ventilator" type="radio" value="Yes" />
                                        No <input name="ventilator" type="radio" value="No" />
                                    </td>
                                    <td>
                                        Preparing Medication<br/>
                                        <select>
                                            <option value="NA">NA</option>
                                            <option value="With Supervision">With Supervision</option>
                                            <option value="Entrustable">Entrustable</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <DiscussionTopics />
                    <div>
                        <h4>Was it evident that this student read/listen to the required materials for today's assigned topic?</h4>
                        Yes <input name="ventilator" type="radio" value="Yes" />
                        No <input name="ventilator" type="radio" value="No" />
                    </div>
                    <div>
                        <h3>
                            Resident Signature
                        </h3>
                        <input type="password"/>
                    </div>
                </div>
                <button>Submit</button>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user
  });

export default connect(mapStateToProps)(FeedbackForm);