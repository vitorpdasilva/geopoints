import React, { useContext } from "react";
import Context from '../../context';
import { GraphQLClient } from 'graphql-request';
import GoogleLogin from 'react-google-login';
import { withStyles } from "@material-ui/core/styles";

const ME_QUERY = `
  {
    me {
      _id
      name
      email
      picture
    }
  }
`;

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context)
  const onSuccess = async googleUser => {
    const { tokenId } = googleUser;
    const client = new GraphQLClient('http://localhost:4000/graphql', {
      headers: { authorization: tokenId }
    })
    const data = await client.request(ME_QUERY);
    dispatch({ type: 'LOGIN_USER', payload: data.me })
    console.log(data);
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
