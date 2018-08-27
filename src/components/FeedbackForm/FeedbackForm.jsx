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
    },
    Select: {
        width: '180px'
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

    fill = () => {
        this.setState({
            resident: 5,
            attendingPhysician: '',
            iv: 2,
            aLine: 1,
            maskVentilation: 2,
            insertLMA: 0,
            intubation: 3,
            plannedAirwayManagement: 0,
            airwayAssessment: 0,
            assessASAScore: 1,
            appliedMonitors: 'Some',
            setupRoom: 'Most',
            plannedInduction: false,
            preparingMedication: 'Entrustable',
            readListened: true,
            residentSignature: 12345
        })
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
                <Typography onClick={this.fill} variant="display3">Daily Feedback</Typography>
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
                                                                // onChange={this.handleCheckboxBooleanToggle('ventilatorSettings')}
                                                                // value={this.state.ventilatorSettings}
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
                                                                // value={this.state.inhaledAgents}
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
                                                                // value={this.state.inductionDrugs}
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
                                                                // value={this.state.vasopressors}
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
                                                                // value={this.state.monitors}
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
                                                                // value={this.state.airwayManagement}
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
                                                    <TextField
                                                        label="IVs"
                                                        type="number"
                                                        onChange={this.handleInputChangeFor('iv')}
                                                        value={this.state.iv}
                                                    />
                                                </td>
                                                <td>
                                                    <TextField
                                                        label="Intubations"
                                                        type="number"
                                                        onChange={this.handleInputChangeFor('intubation')}
                                                        value={this.state.intubation}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <TextField
                                                        label="Arterial Lines"
                                                        type="number"
                                                        onChange={this.handleInputChangeFor('aLine')}
                                                        value={this.state.aLine}
                                                    />
                                                </td>
                                                <td>
                                                    <TextField
                                                        label="Planned Airway Mgmt"
                                                        type="number"
                                                        onChange={this.handleInputChangeFor('plannedAirwayManagement')}
                                                        value={this.state.plannedAirwayManagement}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <TextField
                                                        label="Mask Ventilations"
                                                        type="number"
                                                        onChange={this.handleInputChangeFor('maskVentilation')}
                                                        value={this.state.maskVentilation}
                                                    />
                                                </td>
                                                <td>
                                                    <TextField
                                                        label="Airway Assessments"
                                                        type="number"
                                                        onChange={this.handleInputChangeFor('airwayAssessment')}
                                                        value={this.state.airwayAssessment}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <TextField
                                                        label="Insert LMAs"
                                                        type="number"
                                                        onChange={this.handleInputChangeFor('insertLMA')}
                                                        value={this.state.insertLMA}
                                                    />
                                                </td>
                                                <td>
                                                    <TextField
                                                        label="Assess ASA Score"
                                                        type="number"
                                                        onChange={this.handleInputChangeFor('assessASAScore')}
                                                        value={this.state.assessASAScore}
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
                                                    <FormControl>
                                                        <InputLabel>Applied Monitors</InputLabel>
                                                        <Select
                                                            className={this.props.classes.Select}
                                                            onChange={this.handleInputChangeFor('appliedMonitors')}
                                                            value={this.state.appliedMonitors}
                                                        >
                                                            <MenuItem value="None">None</MenuItem>
                                                            <MenuItem value="Some">Some</MenuItem>
                                                            <MenuItem value="Most">Most</MenuItem>
                                                            <MenuItem value="All">All</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </td>
                                                <td>
                                                    <FormControl>
                                                        <InputLabel>Setup Rooms</InputLabel>
                                                        <Select
                                                            className={this.props.classes.Select}
                                                            onChange={this.handleInputChangeFor('setupRoom')}
                                                            value={this.state.setupRoom}
                                                        >
                                                            <MenuItem value="None">None</MenuItem>
                                                            <MenuItem value="Some">Some</MenuItem>
                                                            <MenuItem value="Most">Most</MenuItem>
                                                            <MenuItem value="All">All</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Typography variant="subheading">Planned Induction</Typography>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onChange={this.handleInputChangeFor('plannedInduction')}
                                                            value={this.state.plannedInduction}
                                                        >
                                                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                            <FormControlLabel value="false" control={<Radio />} label="No" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </td>
                                                <td>
                                                    <FormControl>
                                                        <InputLabel>Preparing Medication</InputLabel>
                                                        <Select
                                                            className={this.props.classes.Select}
                                                            onChange={this.handleInputChangeFor('preparingMedication')}
                                                            value={this.state.preparingMedication}
                                                        >
                                                            <MenuItem value="NA">NA</MenuItem>
                                                            <MenuItem value="With Supervision">With Supervision</MenuItem>
                                                            <MenuItem value="Entrustable">Entrustable</MenuItem>
                                                        </Select>
                                                    </FormControl>
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
                                    <FormControl>
                                        <RadioGroup
                                            onChange={this.handleInputChangeFor('readListened')}
                                            value={this.state.readListened}
                                        >
                                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="false" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>

                                </div>
                                <div>
                                    <Typography variant="subheading">
                                        Resident Signature
                                    </Typography>
                                    <Input 
                                        type="password" 
                                        onChange={this.handleInputChangeFor('residentSignature')} 
                                        value={this.state.residentSignature}
                                    />
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