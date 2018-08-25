import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Paper, Typography, Grid, Button, withStyles, FormControlLabel, Checkbox } from '@material-ui/core'

const astyle = {
    color: 'blue'
}

let styles = {
    Paper: {
        padding: 10
    },
    gridItem: {
        margin: 7
    }
}
class DiscussionTopicsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discussionTopicsList: []
        };
    }


    componentDidMount() {
        axios.get('/api/feedback/discussion').then(response => {
            this.setState({
                discussionTopicsList: response.data
            })
        })
    }


    render() {
        console.log(this.state.discussionTopicsList);

        const list = this.state.discussionTopicsList.map((topic, index) => {
            return (
                <Grid
                    className={this.props.classes.gridItem}
                    item xs
                    key={index}
                >
                    <Paper className={this.props.classes.Paper}>
                        {/* <input
                            type="checkbox"
                            value={topic.podcast_link}
                            onChange={this.props.handleCheckboxChange}
                        />
                        {topic.topic} */}
                        <FormControlLabel
                                control={
                                    <Checkbox 
                                        type="checkbox" 
                                        value={topic.podcast_link}
                                        onChange={this.props.handleCheckboxChange} 
                                    />
                                }
                                label={topic.topic}
                            />
                        <br />
                        Podcast:
                    <a style={astyle} href={topic.podcast_link}>
                            {topic.podcast}
                        </a>
                    </Paper>
                </Grid>
            )
        })


        return (
            <div>
                {list}
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(DiscussionTopicsList));