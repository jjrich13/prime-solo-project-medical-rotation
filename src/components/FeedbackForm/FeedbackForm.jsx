import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';


class FeedbackForm extends Component {
    constructor(props){
        super(props);
        
    }

    
    render(){
        console.log(this.props.user.details);
        
        return(
            <div>
                <Nav />
                <h1>Daily Feedback</h1>
                <div>
                    Form
                </div>
                <button>Submit</button>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user
  });

export default connect(mapStateToProps)(FeedbackForm);