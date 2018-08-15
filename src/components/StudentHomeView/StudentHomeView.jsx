import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentGoalsTable from '../StudentGoalsTable/StudentGoalsTable'

class StudentHomeView extends Component {
    constructor(props){
        super(props);
        
    }

    
    render(){
        console.log(this.props.user.details);
        
        return(
            <div>
                <h1>STUDENT HOME</h1>
                <div>
                    <button>Submit Daily Feedback</button>
                    <button>Feedback History</button>
                </div>
                <StudentGoalsTable />
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user
  });

export default connect(mapStateToProps)(StudentHomeView);