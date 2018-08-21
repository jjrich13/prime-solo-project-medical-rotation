import React, { Component } from 'react';
import { connect } from 'react-redux';


class ResidentPastExperienceTable extends Component {


  render() {
      
    return (
      <table>
          <tbody>
              <tr>
                  <td>
                      IVs
                  </td>
                  <td>
                      {this.props.details.iv}
                  </td>
                  <td>
                      Intubations
                  </td>
                  <td>
                    {this.props.details.intubations}
                  </td>
              </tr>
              <tr>
                  <td>
                      Arterial Lines
                  </td>
                  <td>
                    {this.props.details.arterial_line}
                  </td>
                  <td>
                      Central Lines   
                  </td>
                  <td>
                    {this.props.details.central_line}
                  </td>
              </tr>
              <tr>
                  <td>
                      Mask Ventilations
                  </td>
                  <td>
                    {this.props.details.mask_ventilated}
                  </td>
                  <td>
                      
                  </td>
                  <td>
                      
                  </td>
              </tr>
              

          </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => ({
    user: state.user,
    details: state.resident.details,
  });

export default connect(mapStateToProps)(ResidentPastExperienceTable);
