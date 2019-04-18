import React, { Component } from 'react';
import { Layout } from './components/Layout';
import './scss/custom.css';
import 'antd/dist/antd.css';
import WrappedNormalLoginForm from './components/Register';
import {Switch, Redirect, Route} from 'react-router-dom';



function Display(props) {
  const isLoggedIn = props.isLoggedIn;

  if (isLoggedIn) {
    return <Layout />;
  }

  else if (!isLoggedIn && window.location.pathname !== "/login"){
    return(
      <Switch>
        <Redirect from='/' to='/login' />
        <Route path="/login" component={WrappedNormalLoginForm}/>
      </Switch>
    );
  }

  return(
    <Route path="/login" component={WrappedNormalLoginForm}/>
  );
}



export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Display isLoggedIn={false} />
    );
  }
}
