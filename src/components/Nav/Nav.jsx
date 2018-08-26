import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {connect} from 'react-redux';
import { triggerLogout } from '../../redux/actions/loginActions';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {withStyles, Button} from '@material-ui/core/';


const styles = {
  navBar: {
    width: '100%'
  },
  logout: {
    float: 'right'
  }
};

class Nav extends Component {

  componentDidMount(){
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  adminCheck = () => {
    try { 
      if(this.props.user.user.admin){
        return(
          <BottomNavigationAction label="Admin" href="/#/admin" />
        )
      } else {
        return null;
      } 
    } catch (error) {
      return null;
    }
  }

  residentCheck = () => {
    try { 
      if(this.props.user.user.resident){
        return(
          <BottomNavigationAction label="All Feedback" href="/#/feedback" />
        )
      } else {
        return null;
      } 
    } catch (error) {
      return null;
    }
  }

  studentCheck = () => {
    try { 
      if(!this.props.user.user.resident){
        return(
          <BottomNavigationAction label="My Past Feedback" href="/#/studentfeedbackhistory" />
        )
      } else {
        return null;
      } 
    } catch (error) {
      return null;
    }
  }
  
  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render(){

    return(
      <div className="navbar">
        <BottomNavigation
        showLabels
        className={this.props.classes.navBar}
      >
        <BottomNavigationAction label="Home" href="/#/user" />
        {this.studentCheck()}
        {this.residentCheck()}
        {this.adminCheck()}

          <BottomNavigationAction
            onClick={this.logout}
            // className={this.props.classes.logout}
            label="Log Out"
          />
            {/* Log Out
          </BottomNavigationAction> */}
        
      </BottomNavigation>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Nav));