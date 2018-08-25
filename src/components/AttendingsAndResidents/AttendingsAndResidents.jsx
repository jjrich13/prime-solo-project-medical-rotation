import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Paper, Typography, Grid, Button, Select, withStyles, FormControl, MenuItem, InputLabel, Input } from '@material-ui/core';

const styles = {
    select: {
        margin: 0
    }
}

class AttendingsAndResidents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attendings: [],
            residents: []
        }
    }

    componentDidMount() {
        //populate attending list
        axios.get('/api/feedback/attending').then(response => {
            this.setState({
                attendings: response.data
            })

        }).catch(err => {
            console.log(err);
        })
        //populate resident list
        axios.get('/api/feedback/resident').then(response => {
            this.setState({
                residents: response.data
            })

        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const residentList = this.state.residents.map((resident, index) => {
            return (
                <MenuItem key={index} value={resident.id}>
                    {resident.first_name + ' ' + resident.last_name}
                </MenuItem>
            )
        })

        const attendingList = this.state.attendings.map((attending, index) => {
            return (
                <MenuItem key={index} value={attending.name}>
                    {attending.name}
                </MenuItem>
            )
        })
        console.log(this.state);


        return (
            <div>
                <div>
                    <Typography>Which resident did you work with today?</Typography>
                    <FormControl>
                        <InputLabel>Resident</InputLabel>
                        <Select
                            onChange={this.props.handleInputChangeFor('resident')}
                            value={this.props.selectedResident}
                        >
                            {/* <option disabled selected="selected">-Resident-</option> */}
                            {residentList}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <Typography>If you DID NOT work with a resident today, who was the attending physician?</Typography>
                    <FormControl>
                        <InputLabel>Attending Physician</InputLabel>
                        <Select
                            onChange={this.props.handleInputChangeFor('attendingPhysician')}
                            value={this.props.selectedAttending}
                        >
                            {/* <option disabled selected="selected">-Attending-</option> */}
                            {attendingList}
                            <MenuItem value="NONE">I worked with a resident</MenuItem>
                        </Select>
                    </FormControl>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(AttendingsAndResidents));
