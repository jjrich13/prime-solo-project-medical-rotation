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


    render(){
        console.log(this.state.discussionTopicsList);
        
        const list = this.state.discussionTopicsList.map((topic, index) => {
            return(
                <li key={index}>
                    <input 
                        type="checkbox" 
                        value={topic.podcast_link}
                        onChange={this.props.handleCheckboxChange}
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
            <div>
                {list}
            </div>
                
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
  });

export default connect(mapStateToProps)(DiscussionTopicsList)