import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import DiscussionTopics from '../DiscussionTopics/DiscussionTopics'
import AttendingsAndResidents from '../AttendingsAndResidents/AttendingsAndResidents'
import {
    Paper,
    Typography,
    Grid,
    Button,
    withStyles,
    RadioGroup,
    Radio,
    FormControl,
    TextField,
    FormGroup,
    Checkbox,
    FormControlLabel,
    Select,
    Input,
    InputLabel,
    MenuItem
} from '@material-ui/core'

let styles = {
    Paper: {
        padding: 10
    },
    gridItem: {
        margin: 7
    }
}
class FeedbackForm extends Component {
    constructor(props) {
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
        if (event.target.checked) {
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

    handleSubmit = () => {
        this.props.dispatch({ type: 'POST_FEEDBACK', payload: this.state })
        window.location.href = `/#/user`;
    }


    render() {
        console.log(this.state);

        return (

            <div>
                <Nav />
                <Typography variant="display3">Daily Feedback</Typography>
                <Grid
                    container
                    justify="flex-start"
                    spacing={8}
                    direction="row"
                >
                    <div>
                        <Grid className={this.props.classes.gridItem} item xs={12}>
                            <Paper className={this.props.classes.Paper}>
                                <div>
                                    <Typography variant="display1">Today</Typography>
                                    <Typography>Date For which you are filling out feedback </Typography>
                                    <Input onChange={this.handleInputChangeFor('date')} type="date" />
                                </div>
                                <AttendingsAndResidents
                                    handleInputChangeFor={this.handleInputChangeFor}
                                    selectedResident={this.state.resident}
                                    selectedAttending={this.state.attendingPhysician}
                                />
                            </Paper>
                        </Grid>
                        <Grid className={this.props.classes.gridItem} item xs={12}>
                            <Paper className={this.props.classes.Paper}>
                                <div>
                                    {/* <h2>Discussion Points</h2> */}
                                    <Typography variant="display1">Discussion Points</Typography>
                                    <Typography>Check the box if discussed</Typography>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                type="checkbox"
                                                                onChange={this.handleCheckboxBooleanToggle('ventilatorSettings')}
                                                            />
                                                        }
                                                        label="Ventilator Settings"
                                                    />
                                                </td>
                                                <td>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                type="checkbox"
                                                                onChange={this.handleCheckboxBooleanToggle('inhaledAgents')}
                                                            />
                                                        }
                                                        label="Inhaled Agents"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                type="checkbox"
                                                                onChange={this.handleCheckboxBooleanToggle('inductionDrugs')}
                                                            />
                                                        }
                                                        label="Induction Drugs"
                                                    />
                                                </td>
                                                <td>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                type="checkbox"
                                                                onChange={this.handleCheckboxBooleanToggle('vasopressors')}
                                                            />
                                                        }
                                                        label="Vasopressors"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                type="checkbox"
                                                                onChange={this.handleCheckboxBooleanToggle('monitors')}
                                                            />
                                                        }
                                                        label="Monitors"
                                                    />
                                                </td>
                                                <td>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                type="checkbox"
                                                                onChange={this.handleCheckboxBooleanToggle('airwayManagement')}
                                                            />
                                                        }
                                                        label="Airway Management"
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Paper>
                        </Grid>

                        <Grid className={this.props.classes.gridItem} item xs={12}>
                            <Paper className={this.props.classes.Paper}>
                                <div>
                                    <Typography variant="display1">Performed</Typography>
                                    <Typography>How many times did you do each of these today?</Typography>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    IVs<br />
                                                    <input
                                                        type="number"
                                                        onChange={this.handleInputChangeFor('iv')}
                                                    />
                                                </td>
                                                <td>
                                                    Intubations<br />
                                                    <input
                                                        type="number"
                                                        onChange={this.handleInputChangeFor('intubation')}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Arterial Lines<br />
                                                    <input
                                                        type="number"
                                                        onChange={this.handleInputChangeFor('aLine')}
                                                    />
                                                </td>
                                                <td>
                                                    Planned Airway Management<br />
                                                    <input
                                                        type="number"
                                                        onChange={this.handleInputChangeFor('plannedAirwayManagement')}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Mask Ventilations<br />
                                                    <input
                                                        type="number"
                                                        onChange={this.handleInputChangeFor('maskVentilation')}
                                                    />
                                                </td>
                                                <td>
                                                    Airway Assessments<br />
                                                    <input
                                                        type="number"
                                                        onChange={this.handleInputChangeFor('airwayAssessment')}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Insert LMAs<br />
                                                    <input
                                                        type="number"
                                                        onChange={this.handleInputChangeFor('insertLMA')}
                                                    />
                                                </td>
                                                <td>
                                                    Assess ASA Score <br />
                                                    <input
                                                        type="number"
                                                        onChange={this.handleInputChangeFor('assessASAScore')}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </Paper>
                        </Grid>
                        <Grid className={this.props.classes.gridItem} item xs>
                            <Paper className={this.props.classes.Paper}>
                                <div>
                                    <Typography variant="display1">Did you...</Typography>
                                    <Typography>Did you do the following, today?</Typography>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    Applied Monitors <br />
                                                    <select onChange={this.handleInputChangeFor('appliedMonitors')}>
                                                        <option disabled selected="selected">-Select-</option>
                                                        <option value="None">None</option>
                                                        <option value="Some">Some</option>
                                                        <option value="Most">Most</option>
                                                        <option value="All">All</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    Setup Room<br />
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
                                                    Planned Induction<br />
                                                    Yes <input name="ventilator" type="radio" value="true" onChange={this.handleInputChangeFor('plannedInduction')} />
                                                    No <input name="ventilator" type="radio" value="false" onChange={this.handleInputChangeFor('plannedInduction')} />
                                                </td>
                                                <td>
                                                    Preparing Medication<br />
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
                            </Paper>
                        </Grid>
                        <Grid className={this.props.classes.gridItem} item xs>
                            <Paper className={this.props.classes.Paper}>
                                <DiscussionTopics
                                    handleCheckboxChange={this.handleCheckboxChange}
                                />
                            </Paper>
                        </Grid>
                        <Grid className={this.props.classes.gridItem} item xs>
                            <Paper className={this.props.classes.Paper}>
                                <Typography variant="display1">For Resident</Typography>
                                <div>
                                    <Typography variant="subheading">Was it evident that this student read/listen to the required materials for today's assigned topic?</Typography>
                                    Yes <input name="ventilator" type="radio" value="true" onChange={this.handleInputChangeFor('readListened')} />
                                    No <input name="ventilator" type="radio" value="false" onChange={this.handleInputChangeFor('readListened')} />
                                </div>
                                <div>
                                    <Typography variant="subheading">
                                        Resident Signature
                            </Typography>
                                    <input type="password" onChange={this.handleInputChangeFor('residentSignature')} />
                                </div>
                            </Paper>
                        </Grid>

                    </div>

                </Grid>
                <Button variant="contained" onClick={this.handleSubmit}>Submit</Button>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

// export default connect(mapStateToProps)(FeedbackForm);
export default connect(mapStateToProps)(withStyles(styles)(FeedbackForm));