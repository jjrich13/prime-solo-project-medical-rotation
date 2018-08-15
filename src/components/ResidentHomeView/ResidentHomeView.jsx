import React, { Component } from 'react';
import { connect } from 'react-redux';

class ResidentHomeView extends Component {
    constructor(props){
        super(props);
        
    }

    
    render(){
        return(
            <div>RESIDENT HOME VIEW</div>

        )
    }
}

export default connect()(ResidentHomeView);