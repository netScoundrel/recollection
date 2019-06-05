import React, { Component } from 'react';
import { Layout } from './components/Layout';
import 'antd/dist/antd.css';
import WrappedNormalLoginForm from './components/Login';
import {Switch, Redirect, Route} from 'react-router-dom';
import WrappedRegistrationForm from './components/Register';
import './App.css';
import axious from 'axios';


function Display(props) {
  const isLoggedIn = props.isLoggedIn;
  const handleChange = props.handleChange;

  if (isLoggedIn) {
    
    return(
      <Switch>
        <Redirect from="/login" to="/feed" />
        <Route path="/feed" component={Layout}/>
      </Switch>
    );
  }

  else if (!isLoggedIn && !window.location.pathname.includes("/login") && !window.location.pathname.includes("/register")){
    return(
      <Switch>
        <Redirect from="/feed" to="/login" />
        <Route path="/login" render={(props => <WrappedNormalLoginForm handleChange={handleChange} />)} />
        <Route path="/register" component={WrappedRegistrationForm} />
      </Switch>
    );
  }


    return(
      <Switch>
        <Route path="/login" render={(props => <WrappedNormalLoginForm handleChange={handleChange} />)} />
        <Route path="/register" component={WrappedRegistrationForm}/>
      </Switch>
    );
  


}



export default class App extends Component {

  static displayName = App.name;

  constructor(){
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    isLoggedIn: false
  }

  handleChange(){
    this.setState({isLoggedIn: true});
  }

  componentDidMount(){
    let token = window.localStorage.auth_token;
    if(token){
      axious.post('api/check-auth', {token})
        .then((res) => {
          if(res.data.success = true){
            console.log(res.data);
            this.setState({isLoggedIn: true});
          }
        })
        .catch((err) => {
          console.log(err.message);
        })
    }
    
  }

  render () {
    return (
      <div className="App">
        <Display isLoggedIn={this.state.isLoggedIn} handleChange={this.handleChange} />
      </div>
    );
  }
}