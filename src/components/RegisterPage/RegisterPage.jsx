import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
import {
  TextField, 
  Button, 
  Radio, 
  RadioGroup, 
  FormHelperText, 
  FormControlLabel, 
  FormControl, 
  FormLabel,
  Paper, 
  Typography
} from '@material-ui/core';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
      firstName: '',
      lastName: '',
      email: '',
      resident: false
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });
    } else {
      const body = {
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        resident: this.state.resident
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
    // console.log(this.state);
    
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    console.log('RESIDENT',this.state.resident);
    
    return (
      <div>
        <Paper>
        {this.renderAlert()}
        <form  className="form" onSubmit={this.registerUser}>
          <Typography variant="display3">Register User</Typography>
          <div>
            {/* <label htmlFor="username"> */}
              <TextField
                type="text"
                label="Username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            {/* </label> */}
          </div>
          <div>
            {/* <label htmlFor="password"> */}
              <TextField
                type="password"
                label="Password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            {/* </label> */}
          </div>
          <div>
            <label htmlFor="firstName">
              <TextField
                type="text"
                label="First Name"
                value={this.state.firstName}
                onChange={this.handleInputChangeFor('firstName')}
              />
            </label>
          </div><div>
            <label htmlFor="lastName">
              <TextField
                type="text"
                label="Last Name"
                value={this.state.lastName}
                onChange={this.handleInputChangeFor('lastName')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              <TextField
                type="text"
                label="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </label>
            <div>
              <FormControl>
                <FormLabel component="legend">User Type</FormLabel>
                <RadioGroup
                  aria-label="User Type"
                  value={this.state.resident}
                  onChange={this.handleInputChangeFor('resident')}
                >
                  <FormControlLabel value="false" control={<Radio />} label="Student" />
                  <FormControlLabel value="true" control={<Radio />} label="Resident" />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Register
            </Button>
            <Link to="/home">Cancel</Link>
          </div>
        </form>
        </Paper>
      </div>
    );
  }
}

export default RegisterPage;

