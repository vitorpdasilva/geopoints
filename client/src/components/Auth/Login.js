import React, { useContext } from "react";
import { Typography } from '@material-ui/core'
import Context from '../../context';
import { GraphQLClient } from 'graphql-request';
import GoogleLogin from 'react-google-login';
import { BASE_URL } from '../../client';
import { ME_QUERY } from '../../graphql/queries';
import { withStyles } from "@material-ui/core/styles";


const Login = ({ classes }) => {
  const { dispatch } = useContext(Context)
  const onSuccess = async googleUser => {
    try {
      const tokenId  = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: tokenId }
      })
      const { me } = await client.request(ME_QUERY);
      dispatch({ type: 'LOGIN_USER', payload: me })
      dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() })
    } catch (error) {
      onFailure();
    }
  }

  const onFailure = err => {
    console.error('error login', err);
  }

  return (
    <div className={classes.root}>
      
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        style={{ color: 'rgb(66, 133, 244)' }}
      >
        Welcome
      </Typography>
      <GoogleLogin
        buttonText="Login with Google"
        clientId="425993808005-tq26jpnsupbrupqvtcjn8es2nl3qkc95.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        theme="dark"
        isSignedIn={true}
      />
    </div>
  );
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
