import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogout } from 'react-google-login';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";

import Context from '../../context';

const Signout = ({ classes }) => {
  const { dispatch } = useContext(Context);
  const onSignout = () => {
    dispatch({ type: 'SIGNOUT_USER' });
    console.log('SIGNOUT_USER');
  }
  return (
    <GoogleLogout
      onLogoutSuccess={onSignout}
      render={({ onClick }) => (
        <span className={classes.root} onClick={onclick}>
          <Typography variant="h6" className={classes.buttonText}>Sign Out</Typography>
          <ExitToAppIcon />
        </span>
      )}
    />
      
  )
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex"
  },
  buttonText: {
    color: "orange"
  },
  buttonIcon: {
    marginLeft: "5px",
    color: "orange"
  }
};

export default withStyles(styles)(Signout);
