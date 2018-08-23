import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {connect} from 'react-redux';

class Nav extends Component {

  componentDidMount(){
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  residentCheck = () => {
    try { 
      if(this.props.user.user.admin){
        return(
          <li>
            <Link to="/admin">
              Admin
            </Link>
          </li>
        )
      } else {
        return null;
      } 
    } catch (error) {
      return null;
    }
  }

  render(){

    return(
      <div className="navbar">
        <div>
          <ul>
            <li>
              <Link to="/user">
                User Home
              </Link>
            </li>
            <li>
              <Link to="/info">
                Info Page
              </Link>
            </li>
            {this.residentCheck()}
          </ul>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Nav);
