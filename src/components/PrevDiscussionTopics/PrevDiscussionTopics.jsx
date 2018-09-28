import React, { Component } from 'react';
import { connect } from 'react-redux';
import DiscussionTopicsList from '../DiscussionTopicsList/DiscussionTopicsList'

import { Paper, Typography, Grid, Button, withStyles, GridList } from '@material-ui/core'

class PrevDiscussionTopics extends Component {


    render() {

        return (
            <div>
                
                <Grid item xs={12}>
                    <Typography variant="display1">Discussion Points</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Select what topics you discussed today</Typography>
                </Grid>
                <Grid
                    container
                    justify="flex-start"
                    spacing={8}
                    direction="row"
                    // cols={2}
                >
                    <DiscussionTopicsList handleCheckboxChange={this.props.handleCheckboxChange} />
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(PrevDiscussionTopics)