import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {connect} from 'react-redux';
import Nav from '../Nav/Nav';
import TableResidentStudentList from '../TableResidentStudentList/TableResidentStudentList'
import axios from 'axios';
import DialogDeleteDeactivate from '../DialogDeleteDeactivate/DialogDeleteDeactivate'

import {Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, List, ListItem}  from '@material-ui/core';


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
            inactiveResidents: [],
            dialogOpen: false
        }
    }
    
    componentDidMount(){
        this.getAttendings();
        this.getCurrentResidents();
        this.getDiscussionTopics();
        this.getInactiveResidents();
        this.getInactiveStudents();
        
    }

    componentDidUpdate() {
        //reroute back to login if not logged in user
        if (!this.props.user.isLoading && !this.props.user.details.admin) {
          this.props.history.push('home');
        }
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
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
                <ListItem key={index} >
                    {resident.first_name + ' ' + resident.last_name}
                    <Button variant="outlined" onClick={() => this.deactivateResident(resident.id)}>Deactivate</Button>
                </ListItem>
            )
        })

        const attendingList = this.state.attendings.map((attending,index) => {
            return(
                <ListItem key={index} >
                    {attending.name}
                    <Button variant="outlined" onClick={()=> this.deleteAttending(attending.id)}>Delete</Button>
                </ListItem>
            )
        })

        const discussionTopicTableRows = this.state.discussionTopicsList.map((topic,index) => {
            return(
                <TableRow key={index} >
                    <TableCell>
                        {topic.topic}
                    </TableCell>
                    <TableCell>
                        <a style={astyle} href={topic.podcast_link}>
                            {topic.podcast}
                        </a>
                    </TableCell>
                    <TableCell>
                        {topic.additional_material}
                    </TableCell>
                    <TableCell>
                        <Button variant="outlined"  onClick={()=>this.handleDeleteTopic(topic.id)}>Delete</Button>
                    </TableCell>
                </TableRow>
            )
        })

        const inactiveStudentList = this.state.inactiveStudents.map((student, index) => {
            return(
                <ListItem key={index}>
                    {student.first_name + ' ' + student.last_name}
                    <Button variant="outlined"  onClick={()=> this.handleActivate(student.id)}>Activate</Button>
                </ListItem>
            )
        })

        const inactiveResidentList = this.state.inactiveResidents.map((resident, index) => {
            return(
                <ListItem key={index}>
                    {resident.first_name + ' ' + resident.last_name}
                    <Button variant="outlined"  onClick={()=> this.handleActivate(resident.id)}>Activate</Button>
                </ListItem>
            )
        })

        return(
        <div>
            <Nav />
            <Typography variant="display3">Admin View</Typography>
            <Typography variant="display2">Current Students</Typography>
            <TableResidentStudentList getInactiveStudents = {this.getInactiveStudents} />
            <Typography variant="display2">Current Residents</Typography>
            <ul>
                {residentList}
            </ul>
            <Typography variant="display2">Discussion Topics</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Topic
                        </TableCell>
                        <TableCell>
                            Podcast
                        </TableCell>
                        <TableCell>
                            Additional Links
                        </TableCell>
                        <TableCell>
                            Delete
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {discussionTopicTableRows}
                </TableBody>
            </Table>
            <Typography variant="headline">Add New Discussion Topic</Typography>
            <form onSubmit={this.handleNewTopic}>
                Topic:<input type="text" onChange={this.handleChangeFor('topic')} value={this.state.newTopic.topic}/>
                Podcast Title:<input type="text" onChange={this.handleChangeFor('podcast')} value={this.state.newTopic.podcast}/>
                Podcast Link: <input type="text" onChange={this.handleChangeFor('podcast_link')} value={this.state.newTopic.podcast_link}/>
                Additional Material:<input type="text" onChange={this.handleChangeFor('additional_material')} value={this.state.newTopic.addtional_material}/>
                <Button variant="contained"  type='submit'>Add Topic</Button>
            </form>
            <Typography variant="display2">Current Attending Physicians</Typography>
            <List>
                {attendingList}
            </List>
            <Typography variant="headline">Inactive Students</Typography>
            <List>
                {inactiveStudentList}
            </List>
            <Typography variant="headline">Inactive Residents</Typography>
            <List>
                {inactiveResidentList}
            </List>
            {/* <DialogDeleteDeactivate
                action={this.state.dialogAction}
                function={this.state.}
            /> */}
        </div>
        )
    }
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AdminView);
