import React from 'react';
import { Typography } from '@material-ui/core';

const Header = ({ title }) => (
  <div className="instructions">
    <div>
      <Typography variant="display3" className="lead">{ title }   <span className="beta">Beta</span></Typography>
      {/* <Typography className="beta" variant="caption">Beta</Typography> */}
    </div>
  </div>
);

export default Header;
