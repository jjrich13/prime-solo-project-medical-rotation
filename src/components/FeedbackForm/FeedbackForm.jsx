import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import DiscussionTopics from '../DiscussionTopics/DiscussionTopics'


class FeedbackForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            discussionTopics: [],
            date: '',
            resident: '',
            attendingPhysician: '',
            ventilatorSettings: false,
            inductionDrugs: false,
            inhaledAgents: false,
            vasopressors: false,
            monitors: false,
            airwayManagement: false,
            iv: 0,
            aLine: 0,
            maskVentilation: 0,
            insertLMA: 0,
            intubation: 0,
            plannedAirwayManagement: 0,
            airwayAssessment: 0,
            assessASAScore: 0,
            appliedMonitors: '',
            setupRoom: '',
            plannedInduction: false,
            preparingMedication: '',
            readListened: true,
            residentSignature: ''
        };
        
    }

    handleInputChangeFor = (property) => (event) => {
        this.setState({
            [property]: event.target.value
        })
    }

    handleCheckboxBooleanToggle = (property) => (event) => {
        if(event.target.checked) {
            this.setState({
                [property]: true
            })
        } else {
            this.setState({
                [property]: false
            })
        }
    }

    handleCheckboxChange = (event) => {
        // current array of options
        const discussionTopics = this.state.discussionTopics
        let index
    
        // check if the check box is checked or unchecked
        if (event.target.checked) {
          // add the numerical value of the checkbox to options array
          discussionTopics.push(event.target.value)
        } else {
          // or remove the value from the unchecked checkbox from the array
          index = discussionTopics.indexOf(event.target.value)
          discussionTopics.splice(index, 1)
        }
    
        // update the state with the new array of options
        this.setState({ discussionTopics: discussionTopics })
    }

    
    render(){
        console.log(this.state);
        
        return(
            <div>
                <Nav />
                <h1>Daily Feedback</h1>
                <div>
                    <div>
                        Date For which you are filling out feedback <br/>
                        <input onChange={this.handleInputChangeFor('date')} type="date"/>
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
                                        <input 
                                            type="checkbox"  
                                            onChange={this.handleCheckboxBooleanToggle('ventilatorSettings')}
                                        />
                                        Ventilator Settings
                                    </td>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            onChange={this.handleCheckboxBooleanToggle('inhaledAgents')}
                                        />
                                        Inhaled Agents
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            onChange={this.handleCheckboxBooleanToggle('inductionDrugs')}
                                        />
                                        Induction Drugs
                                    </td>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            onChange={this.handleCheckboxBooleanToggle('vasopressors')}
                                        />
                                        Vasopressors
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            onChange={this.handleCheckboxBooleanToggle('monitors')}
                                        />
                                        Monitors
                                    </td>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            onChange={this.handleCheckboxBooleanToggle('airwayManagement')}
                                        />
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
                                        IVs<br/>
                                        <input 
                                            type="number" 
                                            onChange={this.handleInputChangeFor('iv')}
                                        />
                                    </td>
                                    <td>
                                        Intubations<br/>
                                        <input 
                                            type="number" 
                                            onChange={this.handleInputChangeFor('intubation')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Arterial Lines<br/>
                                        <input 
                                            type="number" 
                                            onChange={this.handleInputChangeFor('aLine')}
                                        />
                                    </td>
                                    <td>
                                        Planned Airway Management<br/>
                                        <input 
                                            type="number" 
                                            onChange={this.handleInputChangeFor('plannedAirwayManagement')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Mask Ventilations<br/>
                                        <input 
                                            type="number" 
                                            onChange={this.handleInputChangeFor('maskVentilation')}
                                        />
                                    </td>
                                    <td>
                                        Airway Assessments<br/>
                                        <input 
                                            type="number" 
                                            onChange={this.handleInputChangeFor('airwayAssessment')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Insert LMAs<br/>
                                        <input 
                                            type="number" 
                                            onChange={this.handleInputChangeFor('insertLMA')}
                                        />
                                    </td>
                                    <td>
                                        Assess ASA Score <br/>
                                        <input 
                                            type="number" 
                                            onChange={this.handleInputChangeFor('assessASAScore')}
                                        />
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
                                        <select onChange={this.handleInputChangeFor('appliedMonitors')}>
                                            <option disabled selected="selected">-Select-</option>
                                            <option value="None">None</option>
                                            <option value="Some">Some</option>
                                            <option value="Most">Most</option>
                                            <option value="All">All</option>
                                        </select>
                                    </td>
                                    <td>
                                        Setup Room<br/>
                                        <select onChange={this.handleInputChangeFor('setupRoom')}>
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
                                        Yes <input name="ventilator" type="radio" value="true" onChange={this.handleInputChangeFor('plannedInduction')} />
                                        No <input name="ventilator" type="radio" value="false" onChange={this.handleInputChangeFor('plannedInduction')} />
                                    </td>
                                    <td>
                                        Preparing Medication<br/>
                                        <select onChange={this.handleInputChangeFor('preparingMedication')} >
                                            <option value="NA">NA</option>
                                            <option value="With Supervision">With Supervision</option>
                                            <option value="Entrustable">Entrustable</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    <DiscussionTopics
                        handleCheckboxChange={this.handleCheckboxChange}
                     />
                    <div>
                        <h4>Was it evident that this student read/listen to the required materials for today's assigned topic?</h4>
                        Yes <input name="ventilator" type="radio" value="true" onChange={this.handleInputChangeFor('readListened')} />
                        No <input name="ventilator" type="radio" value="false" onChange={this.handleInputChangeFor('readListened')} />
                    </div>
                    <div>
                        <h3>
                            Resident Signature
                        </h3>
                        <input type="password" onChange={this.handleInputChangeFor('residentSignature')} />
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