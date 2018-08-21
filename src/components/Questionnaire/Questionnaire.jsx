import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';


class Questionnaire extends Component {
    constructor(props){
        super(props);
        this.state = {
            year: '',
            interestedIn: [],
            applyingTo: '',
            appliedTo: '',
            matchedIn: '',
            letter: '',
            experience: {
                intubations: 0,
                ivs: 0,
                maskVentilations: 0,
                centralLines: 0,
                arterialLines: 0
            },
            runVentilator: false,
            goals: {
                ivs: 0,
                arterialLines: 0,
                maskVentilations: 0,
                lmaInsertions: 0,
                intubations: 0,
                plannedAirwayMgmt: 0,
                airwayAssessments: 0,
                asaScorings: 0
            }

        }
    }

    handleChangeFor = (property) => (event) => {
        this.setState({
            [property]: event.target.value
        })
        
    }

    handleExperienceChange = (property) => (event) => {
        this.setState({
            experience: {
                ...this.state.experience,
                [property]: event.target.value
            }
        })
        
    }

    handleGoalChange = (property) => (event) => {
        this.setState({
            goals: {
                ...this.state.goals,
                [property]: event.target.value
            }
        })
        
    }

    handleSubmit = () => {
        this.props.dispatch({type: 'POST_QUESTIONNAIRE', payload: this.state})
        // this.props.setContent();
    }

    handleCheckboxChange = (event) => {
        // current array of options
        const interestedIn = this.state.interestedIn
        let index
    
        // check if the check box is checked or unchecked
        if (event.target.checked) {
          // add the numerical value of the checkbox to options array
          interestedIn.push(event.target.value)
        } else {
          // or remove the value from the unchecked checkbox from the array
          index = interestedIn.indexOf(event.target.value)
          interestedIn.splice(index, 1)
        }
    
        // update the state with the new array of options
        this.setState({ interestedIn: interestedIn })
    }


    render(){
        console.log(this.state);
        return(
            <div>
                <h2>Intro Questionnaire</h2>
                <p>Answer a few questions about yourself</p>
                <form>
                    <div>
                        1) As of Today I am in:
                        <select onChange={this.handleChangeFor('year')}>
                            <option disabled selected="selected">-Year-</option>
                            <option value="2">MS2</option>
                            <option value="3">MS3</option>
                            <option value="4">MS4</option>
                        </select>
                    </div>
                    <div>
                        2a) If MS2/3, I am interested in:
                        <div>
                            <input type="checkbox" value="Anesthesia" onChange={this.handleCheckboxChange} /> Anesthesia<br/>
                            <input type="checkbox" value="Internal Medicine" onChange={this.handleCheckboxChange} /> Internal Medicine <br/>
                            <input type="checkbox" value="Emergency Medicine" onChange={this.handleCheckboxChange} /> Emergency Medicine<br/>
                            <input type="checkbox" value="OB/GYN" onChange={this.handleCheckboxChange} /> OB/GYN <br/>
                            <input type="checkbox" value="General Surgery" onChange={this.handleCheckboxChange} /> General Surgery <br/>
                            <input type="checkbox" value="Subspecialty Surgery" onChange={this.handleCheckboxChange} /> Subspecialty Surgery <br/>
                            <input type="checkbox" /> Other <i>(currently non-functional)</i> <input type="text"/> 
                        </div>
                    </div>
                    <div>
                        2b) If MS4, I am interested in:
                        <div>
                            Applying to: <input type="text" onChange={this.handleChangeFor('applyingTo')} /> <br/>
                            Applied to: <input type="text" onChange={this.handleChangeFor('appliedTo')} /> <br/>
                            Matched in: <input type="text" onChange={this.handleChangeFor('matchedIn')} /> <br/>
                        </div>
                    </div>
                    <div>
                        3) I am interested in a letter of recommendation <br />
                        Yes <input name="letter" value="Yes" type="radio" onChange={this.handleChangeFor('letter')} />
                        No <input name="letter" value="No" type="radio" onChange={this.handleChangeFor('letter')} />
                        Maybe <input name="letter" value="Maybe" type="radio" onChange={this.handleChangeFor('letter')} />
                    </div>
                    <div>
                        4) Prior to this rotation how many of the following have you performed on LIVE patients? <br />
                        Intubations <input type="number" onChange={this.handleExperienceChange('intubations')} /> 
                        IVs <input type="number" onChange={this.handleExperienceChange('ivs')} />
                        Mask Ventilations <input type="number" onChange={this.handleExperienceChange('maskVentilations')} />
                        Central Lines <input type="number" onChange={this.handleExperienceChange('centralLines')} />
                        Arterial Lines <input type="number" onChange={this.handleExperienceChange('arterialLines')} />
                    </div>
                    <div>
                        5) Prior to this rotation I have run a ventialtor. <br />
                        Yes <input name="ventilator" type="radio" value="Yes" onChange={this.handleChangeFor('ventilator')}/>
                        No <input name="ventilator" type="radio" value="No" onChange={this.handleChangeFor('ventilator')}/>
                    </div>
                    <div>
                        6) Set some goals for you rotation. How many of each of the folowing would you like to do before you finish?  <br />
                        IVs <input type="number" onChange={this.handleGoalChange('ivs')} /> 
                        Arterial Lines <input type="number" onChange={this.handleGoalChange('arterialLines')} />
                        Mask Ventilations <input type="number" onChange={this.handleGoalChange('maskVentilations')} />
                        LMA insertions <input type="number" onChange={this.handleGoalChange('lmaInsertions')} />
                        Intubations <input type="number" onChange={this.handleGoalChange('intubations')} />
                        Planned Airway Management <input type="number" onChange={this.handleGoalChange('plannedAirwayMgmt')} />
                        Airway Assessments <input type="number" onChange={this.handleGoalChange('airwayAssessments')} />
                        ASA Assessment Scorings <input type="number" onChange={this.handleGoalChange('asaScorings')} />
                    </div>
                    <button type="submit" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user
  });

export default connect(mapStateToProps)(Questionnaire);