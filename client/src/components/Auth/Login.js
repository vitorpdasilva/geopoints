import React from "react";
import GoogleLogin from 'react-google-login';
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {
  const onSuccess = (googleUser) => {
    console.log('on success', googleUser, classes);
  }
  return <GoogleLogin clientId="425993808005-tq26jpnsupbrupqvtcjn8es2nl3qkc95.apps.googleusercontent.com" onSuccess={onSuccess} onFailure={err => console.log('fail', err)} isSignedIn={true} />;
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
