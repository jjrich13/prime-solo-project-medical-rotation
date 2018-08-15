import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';


class StudentFeedbackHistory extends Component {
    constructor(props){
        super(props);
        
    }

    
    render(){
        console.log(this.props.user.details);
        
        return(
            <div>
                <Nav />
                <h1>Feedback History</h1>
                <div>
                    Table
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user
  });

export default connect(mapStateToProps)(StudentFeedbackHistory);