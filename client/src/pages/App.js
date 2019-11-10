import React from "react";
import withRoot from "../withRoot";
import Header from '../components/Header';

const App = () => {
  console.log('app')
  return <Header />;
};

export default withRoot(App);
