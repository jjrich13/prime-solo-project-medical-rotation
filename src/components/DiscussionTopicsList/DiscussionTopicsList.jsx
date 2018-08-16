import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const astyle = {
    color: 'blue'
}

class DiscussionTopicsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            discussionTopicsList: []
        };
    }
    

    componentDidMount(){
        axios.get('/api/feedback/discussion').then(response =>{
            this.setState({
                discussionTopicsList: response.data
            })
        })
    }

    isEven = (value) => {
        if (value%2 == 0)
            return true;
        else
            return false;
    }

    render(){
        console.log(this.state.discussionTopicsList);
        
        const list = this.state.discussionTopicsList.map((topic, index) => {
            return(
                <li key={index}>
                    <input 
                        type="checkbox" 
                        value={topic.topic}
                    />
                    {topic.topic} 
                    <br/> 
                    Podcast: 
                    <a style={astyle} href={topic.podcast_link}>
                        {topic.podcast}
                    </a>
                </li>
            )
        })

        
        return(
            <tbody>
                {list}
                {/* <tr>
                    <td>
                        <input type="checkbox" value="Ventilator Settings"/>
                        Ventilator Settings
                    </td>
                    <td>
                        <input type="checkbox" value="Inhaled Agents"/>
                        Inhaled Agents
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="checkbox" value="Induction Drugs"/>
                        Induction Drugs
                    </td>
                    <td>
                        <input type="checkbox" value="Vasopressors"/>
                        Vasopressors
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="checkbox" value="Monitors"/>
                        Monitors
                    </td>
                    <td>
                        <input type="checkbox" value="Airway Management"/>
                        Airway Management
                    </td>
                </tr> */}
            </tbody>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
  });

export default connect(mapStateToProps)(DiscussionTopicsList)