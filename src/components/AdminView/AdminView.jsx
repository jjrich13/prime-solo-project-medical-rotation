import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {connect} from 'react-redux';
import Nav from '../Nav/Nav';
import TableResidentStudentList from '../TableResidentStudentList/TableResidentStudentList'
import axios from 'axios';

const astyle = {
    color: 'blue'
}
class AdminView extends Component {
    constructor(props){
        super(props);

        this.state= {
            attendings: [],
            residents: [],
            discussionTopicsList: []
        }
    }
    
    componentDidMount(){
        this.getAttendings();
        this.getResidents();
        this.getDiscussionTopics();
        
    }

    getAttendings = () => {
        axios.get('/api/feedback/attending').then(response => {
            this.setState({
                attendings: response.data
            })
                
            }).catch(err => {
                console.log(err);
        })
    }

    getDiscussionTopics = () => {
        axios.get('/api/feedback/discussion').then(response =>{
            this.setState({
                discussionTopicsList: response.data
            })
        })
    }

    getResidents = () => {
        axios.get('/api/feedback/resident').then(response => {
            this.setState({
                residents: response.data
            })
                
        }).catch(err => {
                console.log(err);
        })
    }

    deactivateResident = (id) => {
        axios.put(`/api/admin/deactivate/${id}`).then(response => {
            this.getResidents();
                
        }).catch(err => {
                console.log(err);
        })
        
    }

    deleteAttending = (id) => {
        console.log(id);
        axios.delete(`/api/admin/deleteAttending/${id}`).then(response => {
            this.getAttendings();
                
        }).catch(err => {
                console.log(err);
        })
    }

  render(){
    console.log(this.state);
      
    const residentList = this.state.residents.map((resident,index) => {
        return(
            <li key={index} >
                {resident.first_name + ' ' + resident.last_name}
                <button onClick={() => this.deactivateResident(resident.id)}>Deactivate</button>
            </li>
        )
    })

    const attendingList = this.state.attendings.map((attending,index) => {
        return(
            <li key={index} >
                {attending.name}
                <button onClick={()=> this.deleteAttending(attending.id)}>Delete</button>
            </li>
        )
    })

    const discussionTopicTableRows = this.state.discussionTopicsList.map((topic,index) => {
        return(
            <tr key={index} >
                <td>
                    {topic.topic}
                </td>
                <td>
                    <a style={astyle} href={topic.podcast_link}>
                        {topic.podcast}
                    </a>
                </td>
                <td>
                    {topic.additional_material}
                </td>
                <td>
                    Delete
                </td>
            </tr>
        )
    })

    return(
      <div>
        <Nav />
        <h1>Admin View</h1>
        <h2>Current Students</h2>
        <TableResidentStudentList />
        <h2>Current Residents</h2>
        <ul>
            {residentList}
        </ul>
        <h2>Discussion Topics</h2>
        <table>
            <thead>
                <tr>
                    <th>
                        Topic
                    </th>
                    <th>
                        Podcast
                    </th>
                    <th>
                        Additional Links
                    </th>
                    <th>
                        Delete
                    </th>
                </tr>
            </thead>
            <tbody>
                {discussionTopicTableRows}
            </tbody>
        </table>
        <h2>Current Attending Physicians</h2>
        <ul>
            {attendingList}
        </ul>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AdminView);
