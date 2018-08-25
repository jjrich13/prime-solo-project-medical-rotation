import React, { Component } from 'react';
import { connect } from 'react-redux';
import DiscussionTopicsList from '../DiscussionTopicsList/DiscussionTopicsList'

import { Paper, Typography, Grid, Button, withStyles, GridList } from '@material-ui/core'

class DiscussionTopics extends Component {


    render() {

        return (
            <div>
                
                <Grid item xs={12}>
                    <Typography variant="display1">For Tomorrow</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Select What you'd like to discuss tomorrow with a resident (4 or fewer)</Typography>
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

export default connect(mapStateToProps)(DiscussionTopics)