import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {connect} from 'react-redux';
import Nav from '../Nav/Nav';
import TableResidentStudentList from '../TableResidentStudentList/TableResidentStudentList'
import axios from 'axios';
import StudentFeedbackHistory from '../StudentFeedbackHistory/StudentFeedbackHistory';

const astyle = {
    color: 'blue'
}
class AdminView extends Component {
    constructor(props){
        super(props);

        this.state= {
            attendings: [],
            residents: [],
            discussionTopicsList: [],
            newTopic: {
                topic: '',
                podcast: '',
                podcast_link: '',
                additional_material: ''
            },
            inactiveStudents: [],
            inactiveResidents: []
        }
    }
    
    componentDidMount(){
        this.getAttendings();
        this.getCurrentResidents();
        this.getDiscussionTopics();
        this.getInactiveResidents();
        this.getInactiveStudents();
        
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

    getCurrentResidents = () => {
        axios.get('/api/feedback/resident').then(response => {
            this.setState({
                residents: response.data
            })
                
        }).catch(err => {
                console.log(err);
        })
    }

    deactivateResident = (id) => {
        axios.put(`/api/admin/toggleActive/${id}`).then(response => {
            this.getCurrentResidents();
            this.getInactiveResidents();
                
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

    handleChangeFor = (property) => (event) => {
        this.setState({
            newTopic: {
                ...this.state.newTopic,
                [property]: event.target.value
            }
        })
    }

    handleNewTopic = (event) => {
        event.preventDefault();
        console.log(this.state.newTopic);
        
        axios.post('/api/admin/topic', this.state.newTopic).then(response => {
            this.getDiscussionTopics();
            this.clearInputs();
        }).catch(err => {
            console.log(err);
            
        })
    }

    clearInputs = () => {
        this.setState({
            newTopic: {
                topic: '',
                podcast: '',
                podcast_link: '',
                additional_material: ''
            }
        })
    }

    handleDeleteTopic = (id) => {
        console.log(id);
        axios.delete(`/api/admin/topic/${id}`).then(response => {
            this.getDiscussionTopics();
        }).catch(err => {
            console.log(err);
        })
        
    }

    getInactiveResidents = () => {
        axios.get('/api/admin/inactiveResident').then(response => {
            this.setState({
                inactiveResidents: response.data
            })
                
        }).catch(err => {
                console.log(err);
        })
    }
    
    getInactiveStudents = () => {
        axios.get('/api/admin/inactiveStudent').then(response => {
            this.setState({
                inactiveStudents: response.data
            })
                
        }).catch(err => {
                console.log(err);
        })
    }

    handleActivate = (id) => {
        axios.put(`/api/admin/toggleActive/${id}`).then(response => {
            this.getCurrentResidents();
            this.getInactiveResidents();
            this.getInactiveStudents();
            this.props.dispatch({
                type: 'FETCH_RESIDENT_STUDENT_LIST'
            })
                
        }).catch(err => {
                console.log(err);
        })
    }

    render(){
      
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
                        <button onClick={()=>this.handleDeleteTopic(topic.id)}>Delete</button>
                    </td>
                </tr>
            )
        })

        const inactiveStudentList = this.state.inactiveStudents.map((student, index) => {
            return(
                <li key={index}>
                    {student.first_name + ' ' + student.last_name}
                    <button onClick={()=> this.handleActivate(student.id)}>Activate</button>
                </li>
            )
        })

        const inactiveResidentList = this.state.inactiveResidents.map((resident, index) => {
            return(
                <li key={index}>
                    {resident.first_name + ' ' + resident.last_name}
                    <button onClick={()=> this.handleActivate(resident.id)}>Activate</button>
                </li>
            )
        })

        return(
        <div>
            <Nav />
            <h1>Admin View</h1>
            <h2>Current Students</h2>
            <TableResidentStudentList getInactiveStudents = {this.getInactiveStudents} />
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
            <h3>Add New Discussion Topic</h3>
            <form onSubmit={this.handleNewTopic}>
                Topic:<input type="text" onChange={this.handleChangeFor('topic')} value={this.state.newTopic.topic}/>
                Podcast Title:<input type="text" onChange={this.handleChangeFor('podcast')} value={this.state.newTopic.podcast}/>
                Podcast Link: <input type="text" onChange={this.handleChangeFor('podcast_link')} value={this.state.newTopic.podcast_link}/>
                Addtional Material:<input type="text" onChange={this.handleChangeFor('additional_material')} value={this.state.newTopic.addtional_material}/>
                <button type='submit'>Add Topic</button>
            </form>
            <h2>Current Attending Physicians</h2>
            <ul>
                {attendingList}
            </ul>
            <h2>Inactive Students</h2>
            <ul>
                {inactiveStudentList}
            </ul>
            <h2>Inactive Residents</h2>
            <ul>
                {inactiveResidentList}
            </ul>
        </div>
        )
    }
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AdminView);
