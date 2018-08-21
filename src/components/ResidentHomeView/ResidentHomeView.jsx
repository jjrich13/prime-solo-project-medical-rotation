import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TableResidentStudentList from '../TableResidentStudentList/TableResidentStudentList'
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

    handleViewFeedback = () => {
        window.location.href= `/#/feedback`;
    }
    
    render(){
        return(
            <div>
                <h1>Resident Home</h1>
                <button onClick={this.handleViewFeedback}>View Feedback</button>
                <p>Resident Code: {this.state.residentCode}</p>
                <TableResidentStudentList />
            </div>
        )
    }
}

export default connect()(ResidentHomeView);