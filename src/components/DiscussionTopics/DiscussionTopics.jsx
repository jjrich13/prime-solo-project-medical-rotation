import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DiscussionTopicsList from '../DiscussionTopicsList/DiscussionTopicsList'

class DiscussionTopics extends Component{
    

    render(){

        return(
            <div>
                <h2>For Tomorrow</h2>
                <p>Select What you'd like to discuss tomorrow with a resident (4 or fewer)</p>
                <DiscussionTopicsList />
                        
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
  });

export default connect(mapStateToProps)(DiscussionTopics)