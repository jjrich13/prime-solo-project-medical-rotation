import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';


import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { RadioGroup, Radio, Button } from '../../../node_modules/@material-ui/core';


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

    fill = () => {
        this.setState({
            year: "2",
            applyingTo: 'Anesthesia',
            appliedTo: 'None',
            matchedIn: 'None',
            letter: 'Yes',
            experience: {
                intubations: 2,
                ivs: 12,
                maskVentilations: 5,
                centralLines: 1,
                arterialLines: 0
            },
            runVentilator: false,
            goals: {
                ivs: 5,
                arterialLines: 2,
                maskVentilations: 3,
                lmaInsertions: 2,
                intubations: 4,
                plannedAirwayMgmt: 4,
                airwayAssessments: 3,
                asaScorings: 3
            }
        })
    }


    render(){
        console.log(this.state);
        return(
            <div>
                <h2 onClick={this.fill}>Intro Questionnaire</h2>
                <p>Answer a few questions about yourself</p>
                <form>
                    <div>
                        1) As of Today I am in:
                        <FormControl>
                            <InputLabel>Year</InputLabel>
                            <Select 
                                onChange={this.handleChangeFor('year')}
                                value={this.state.year}
                                placeholder="resident"
                            >
                                <MenuItem value="2">MS2</MenuItem>
                                <MenuItem value="3">MS3</MenuItem>
                                <MenuItem value="4">MS4</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        2a) If MS2/3, I am interested in:
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        type="checkbox" 
                                        value="Anesthesia" 
                                        onChange={this.handleCheckboxChange} 
                                    />
                                }
                                label="Anesthesia"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        type="checkbox" 
                                        value="Internal Medicine" 
                                        onChange={this.handleCheckboxChange} 
                                    />
                                }
                                label="Internal Medicine"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        type="checkbox" 
                                        value="Emergency Medicine" 
                                        onChange={this.handleCheckboxChange} 
                                    />
                                }
                                label="Emergency Medicine"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        type="checkbox" 
                                        value="OB/GYN" 
                                        onChange={this.handleCheckboxChange} 
                                    />
                                }
                                label="OB/GYN"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        type="checkbox" 
                                        value="General Surgery" 
                                        onChange={this.handleCheckboxChange} 
                                    />
                                }
                                label="General Surgery"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        type="checkbox" 
                                        value="Subspecialty Surgery" 
                                        onChange={this.handleCheckboxChange} 
                                    />
                                }
                                label="Subspecialty Surgery"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        type="checkbox"
                                        onChange={this.handleCheckboxChange} 
                                    />
                                }
                                label="Other"
                            />
                        </FormGroup>
                    </div>
                    <div>
                        2b) If MS4, I am interested in:
                        <div>
                            <TextField multiline="true" label="Applying to:" value={this.state.applyingTo} type="text" onChange={this.handleChangeFor('applyingTo')} /> <br/>
                            <TextField multiline="true" label="Applied to:" value={this.state.appliedTo} type="text" onChange={this.handleChangeFor('appliedTo')} /> <br/>
                            <TextField multiline="true" label="Matched in:" value={this.state.matchedIn} type="text" onChange={this.handleChangeFor('matchedIn')} /> <br/>
                        </div>
                    </div>
                    <div>
                        3) I am interested in a letter of recommendation <br />
                        <RadioGroup
                            onChange={this.handleChangeFor('letter')}
                            value={this.state.letter}
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                            <FormControlLabel value="Maybe" control={<Radio />} label="Maybe" />
                        </RadioGroup>
                    </div>
                    <div>
                        4) Prior to this rotation how many of the following have you performed on LIVE patients? <br />
                        <FormGroup>
                            <TextField 
                                label="Intubations" 
                                type="number" 
                                value={this.state.experience.intubations}
                                onChange={this.handleExperienceChange('intubations')} 
                            /> 
                            <TextField 
                                label="IVs" 
                                type="number" 
                                value={this.state.experience.ivs}
                                onChange={this.handleExperienceChange('ivs')} 
                            />
                            <TextField 
                                label="Mask Ventilations" 
                                type="number" 
                                value={this.state.experience.maskVentilations}
                                onChange={this.handleExperienceChange('maskVentilations')} 
                            />
                            <TextField 
                                label="Central Lines" 
                                type="number" 
                                value={this.state.experience.centralLines}
                                onChange={this.handleExperienceChange('centralLines')} 
                            />
                            <TextField 
                                label="Arterial Lines" 
                                type="number" 
                                value={this.state.experience.arterialLines}
                                onChange={this.handleExperienceChange('arterialLines')} 
                            />
                        </FormGroup>
                    </div>
                    <div>
                        5) Prior to this rotation I have run a ventilator. <br />
                        {/* Yes <input name="ventilator" type="radio" value="Yes" onChange={this.handleChangeFor('ventilator')}/>
                        No <input name="ventilator" type="radio" value="No" onChange={this.handleChangeFor('ventilator')}/> */}
                        <RadioGroup
                            onChange={this.handleChangeFor('runVentilator')}
                            value={this.state.runVentilator}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </div>
                    <div>
                        6) Set some goals for you rotation. How many of each of the folowing would you like to do before you finish?  <br />
                        <FormGroup>
                            <TextField label="IVs" type="number" value={this.state.goals.ivs} onChange={this.handleGoalChange('ivs')} /> 
                            <TextField label="Arterial Lines" type="number" value={this.state.goals.arterialLines} onChange={this.handleGoalChange('arterialLines')} />
                            <TextField label="Mask Ventilations" type="number" value={this.state.goals.maskVentilations} onChange={this.handleGoalChange('maskVentilations')} />
                            <TextField label="LMA insertions" type="number" value={this.state.goals.lmaInsertions} onChange={this.handleGoalChange('lmaInsertions')} />
                            <TextField label="Intubations" type="number" value={this.state.goals.intubations} onChange={this.handleGoalChange('intubations')} />
                            <TextField label="Planned Airway Management" type="number" value={this.state.goals.plannedAirwayMgmt} onChange={this.handleGoalChange('plannedAirwayMgmt')} />
                            <TextField label="Airway Assessments" type="number" value={this.state.goals.airwayAssessments} onChange={this.handleGoalChange('airwayAssessments')} />
                            <TextField label="ASA Assessment Scorings" type="number" value={this.state.goals.asaScorings} onChange={this.handleGoalChange('asaScorings')} />
                        </FormGroup>
                    </div>
                    <Button variant="outlined" type="submit" onClick={this.handleSubmit}>Submit</Button>
                </form>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user
  });

export default connect(mapStateToProps)(Questionnaire);