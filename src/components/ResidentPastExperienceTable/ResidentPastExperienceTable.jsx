import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class ResidentPastExperienceTable extends Component {


  render() {
      
    return (
      <Table>
          <TableBody>
              <TableRow>
                  <TableCell>
                      IVs
                  </TableCell>
                  <TableCell>
                      {this.props.details.iv}
                  </TableCell>
                  <TableCell>
                      Intubations
                  </TableCell>
                  <TableCell>
                    {this.props.details.intubations}
                  </TableCell>
              </TableRow>
              <TableRow>
                  <TableCell>
                      Arterial Lines
                  </TableCell>
                  <TableCell>
                    {this.props.details.arterial_line}
                  </TableCell>
                  <TableCell>
                      Central Lines   
                  </TableCell>
                  <TableCell>
                    {this.props.details.central_line}
                  </TableCell>
              </TableRow>
              <TableRow>
                  <TableCell>
                      Mask Ventilations
                  </TableCell>
                  <TableCell>
                    {this.props.details.mask_ventilated}
                  </TableCell>
                  <TableCell>
                      
                  </TableCell>
                  <TableCell>
                      
                  </TableCell>
              </TableRow>
              

          </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
    user: state.user,
    details: state.resident.details,
  });

export default connect(mapStateToProps)(ResidentPastExperienceTable);
