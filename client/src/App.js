import React, { Component } from 'react';
import { Layout } from './components/Layout';
import './scss/custom.css';
import 'antd/dist/antd.css';
import WrappedNormalLoginForm from './components/Login';
import {Switch, Redirect, Route} from 'react-router-dom';
import WrappedRegistrationForm from './components/Register';



function Display(props) {
  const isLoggedIn = props.isLoggedIn;
  const handleChange = props.handleChange;

  if (isLoggedIn) {
    
    return(
      <Switch>
        <Redirect from='/login' to='/feed' />
        <Layout />
      </Switch>
      
    );
  }

  else if (!isLoggedIn && window.location.pathname !== "/login" && window.location.pathname !== "/register"){
    return(
      <Switch>
        <Redirect from='/' to='/login' />
        <Route path="/login" component={WrappedNormalLoginForm}/>
      </Switch>
    );
  }

  return(
    <Switch>
      <Route path="/login" render={(props => <WrappedNormalLoginForm handleChange={handleChange} />)}/>
      <Route path="/register" component={WrappedRegistrationForm}/>
    </Switch>
    
  );
}



export default class App extends Component {

  static displayName = App.name;
  constructor(domain){
    super();
    

    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    isLoggedIn: false
  }

  handleChange(){
    this.setState({isLoggedIn: true});
  }

  
  render () {
    return (
      <Display isLoggedIn={this.state.isLoggedIn} handleChange={this.handleChange} />
    );
  }
}
