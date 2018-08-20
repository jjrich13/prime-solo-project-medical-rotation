import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TableBodyResidentStudentList from '../TableBodyResidentStudentList/TableBodyResidentStudentList'
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
                <table>
                    <thead>
                        <tr>
                            <th>
                                Student
                            </th>
                            <th>
                                Year
                            </th>
                            <th>
                                Progress
                            </th>
                            <th>
                                Info
                            </th>
                        </tr>
                    </thead>
                    <TableBodyResidentStudentList />
                </table>
            </div>

        )
    }
}

export default connect()(ResidentHomeView);