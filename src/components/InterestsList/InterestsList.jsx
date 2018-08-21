import React, { Component } from 'react';
import { connect } from 'react-redux';


class InterestsList extends Component {


  render() {
      console.log(this.props.user);
      let interests = [];
      if(this.props.details.interested_in){
          interests = this.props.details.interested_in.map((interest, index) => {
            return (
                <li key={index}>
                    {interest}
                </li>
            )
        })} 
      
    return (
      <ul>
          {interests}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
    user: state.user,
    details: state.resident.details,
  });

export default connect(mapStateToProps)(InterestsList);
