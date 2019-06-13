import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { GamePageLayout } from './components/GamePageLayout';
import 'antd/dist/antd.css';
import { Login } from './components/Login';
import {Switch, Redirect, Route} from 'react-router-dom';
import WrappedRegistrationForm from './components/Register';
import './App.css';
import axios from 'axios';
import { Error } from './components/Error';
import {ProtectedRoute} from './components/Protected.Route';
import Auth from './Auth';

export default class App extends Component {

  static displayName = App.name;

  constructor(){
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    auth: Auth.authenticated,
    name: "",
    userId: ""
  }

  handleChange(){
    Auth.login(() => {});
    this.setState({auth: Auth.authenticated});
  }

  componentDidMount(){
    let token = window.localStorage.auth_token;
    if(token){
      axios.post('api/check-auth', {token})
        .then((res) => {
          if(res.data.success = true){
            Auth.login(() => {});
            this.setState({auth: Auth.authenticated, name: res.data.authDate.username, userId: res.data.userId});
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
        
          {Auth.isAuthenticated() 
          ? (
            <Switch>
              <Redirect exact from='/' to='/feed' />
              <Route exact path="/feed" render={(routeProps) => <Layout {...routeProps} {...this.props} username={this.state.name} userId={this.state.userId} />}/>
              <Route username={this.state.name} exact path="/games" component={GamePageLayout} />
              <Route path="*" component={Error} />
            </Switch>
          ) 
          : (
            <Switch>
              <Route exact path="/" render={() => <Login handleChange={this.handleChange} />} />
              <Route path="/register" component={WrappedRegistrationForm} />
              <Redirect from='/feed' to='/' />
              <Route path="*" component={Error} />
            </Switch>
          )}
        
      </div>
    );
  }
}