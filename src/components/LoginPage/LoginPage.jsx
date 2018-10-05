import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import TextField from '@material-ui/core/TextField';
import {Button, Typography} from '@material-ui/core';



const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch(clearError());
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName !== null) {
      this.props.history.push('user');
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          { this.props.login.message }
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        { this.renderAlert() }
        <form className="form" onSubmit={this.login}>
          <Typography variant="display3">Login</Typography>
          <div>
            {/* <label htmlFor="username"> */}
              <TextField
                label="Username"
                type="text"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            {/* </label> */}
          </div>
          <div>
            {/* <label htmlFor="password"> */}
              <TextField
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            {/* </label> */}
          </div>
          <div>
            <br/>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              name="submit"
            >
              Log in
            </Button>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
