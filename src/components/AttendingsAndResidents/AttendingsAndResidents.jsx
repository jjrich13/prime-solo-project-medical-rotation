import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class AttendingsAndResidents extends Component{
    constructor(props){
        super(props);

        this.state= {
            attendings: [],
            residents: []
        }
    }

    componentDidMount(){
        //populate attending list
        axios.get('/api/feedback/attending').then(response => {
            this.setState({
                attendings: response.data
            })
                
            }).catch(err => {
                console.log(err);
        })
        //populate resident list
        axios.get('/api/feedback/resident').then(response => {
            this.setState({
                residents: response.data
            })
                
        }).catch(err => {
                console.log(err);
        })
    }

    render(){
        const residentList = this.state.residents.map((resident,index) => {
            return(
                <option key={index} value={resident.id}>
                    {resident.first_name + ' ' + resident.last_name}
                </option>
            )
        })

        const attendingList = this.state.attendings.map((attending,index) => {
            return(
                <option key={index} value={attending.name}>
                    {attending.name}
                </option>
            )
        })
        console.log(this.state);
        
        
        return(
            <div>
                    <div>
                        Which resident did you work with today? <br/>
                        <select onChange={this.props.handleInputChangeFor('resident')}>
                            <option disabled selected="selected">-Resident-</option>
                            {residentList}
                        </select>
                    </div>
                    <div>
                        If you DID NOT work with a resident today, who was the attending physician? <br/>
                        <select onChange={this.props.handleInputChangeFor('attendingPhysician')}>
                            <option disabled selected="selected">-Attending-</option>
                            {attendingList}
                            <option value="NONE">I worked with a resident</option>
                        </select>
                    </div>
                        
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
  });

export default connect(mapStateToProps)(AttendingsAndResidents)
