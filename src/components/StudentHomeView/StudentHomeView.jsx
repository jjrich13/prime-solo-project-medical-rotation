import React, { Component } from 'react';
import { connect } from 'react-redux';

class StudentHomeView extends Component {
    constructor(props){
        super(props);
        
    }

    
    render(){
        console.log(this.state);
        return(
            <div>STUDENT HOME VIEW</div>

        )
    }
}

export default connect()(StudentHomeView);