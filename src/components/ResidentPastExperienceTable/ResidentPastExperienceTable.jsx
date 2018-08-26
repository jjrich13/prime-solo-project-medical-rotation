import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {List, ListItem} from '@material-ui/core';


class ResidentPastExperienceTable extends Component {


  render() {
      
    return (
        <List>
            <ListItem>
            IVs: {this.props.details.iv}
            </ListItem>
            <ListItem>
            Intubations: {this.props.details.intubations}
            </ListItem>
            <ListItem>
            Arterial Lines: {this.props.details.arterial_line}
            </ListItem>
            <ListItem>
            Central Lines: {this.props.details.central_line}
            </ListItem>
            <ListItem>
            Mask Ventilations: {this.props.details.mask_ventilated}
            </ListItem>
        </List>
    );
  }
}

const mapStateToProps = state => ({
    user: state.user,
    details: state.resident.details,
  });

export default connect(mapStateToProps)(ResidentPastExperienceTable);
