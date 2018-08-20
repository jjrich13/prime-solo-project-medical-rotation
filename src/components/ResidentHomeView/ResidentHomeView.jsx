import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
class ResidentHomeView extends Component {
    constructor(props){
        super(props);
        this.state = {
            residentCode: ''
        }
        
    }

    componentDidMount(){
        axios.get('/api/resident/code').then(response => {
            this.setState({
                residentCode: response.data
            })
            
        })
    }

    
    render(){
        return(
            <div>
                <h1>Resident Home</h1>
                <p>Resident Code: {this.state.residentCode}</p>
            </div>

        )
    }
}

export default connect()(ResidentHomeView);