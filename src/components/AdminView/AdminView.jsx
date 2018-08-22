import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {connect} from 'react-redux';
import Nav from '../Nav/Nav';

class AdminView extends Component {


  render(){

    return(
      <div>
          <Nav />
        ADMIN VIEW
      </div>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AdminView);
