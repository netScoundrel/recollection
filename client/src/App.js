import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { GamePageLayout } from './components/GamePageLayout';
import 'antd/dist/antd.css';
import { Login } from './components/Login';
import {Switch, Redirect, Route} from 'react-router-dom';
import {Register} from './components/Register';
import './App.css';
import axios from 'axios';
import { Error } from './components/Error';
import { Profile } from './components/Profile';
import Auth from './Auth';

export default class App extends Component {

  static displayName = App.name;

  constructor(){
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  state = {
    auth: Auth.authenticated,
    name: "",
    userId: "",
    avatarId: ""
  }

  handleChange(name="", userId="", avatarId=""){
    Auth.login(() => {});
    this.setState({auth: Auth.authenticated, name, userId, avatarId});
  }

  handleLogout = () => {
    Auth.logout(() => {});
    this.setState({auth: Auth.authenticated, name: "", userId: "", avatarId: ""});
    window.localStorage.clear();
  }

  componentDidMount(){
    let token = window.localStorage.auth_token;
    if(token){
      axios.post('api/check-auth', {token})
        .then((res) => {
          if(res.data.success === true){
            Auth.login(() => {});
            this.setState({auth: Auth.authenticated, name: res.data.authDate.username, userId: res.data.userId, avatarId: res.data.avatarId});
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
              <Route exact path="/feed" render={(routeProps) => <Layout {...routeProps} {...this.props} username={this.state.name} userId={this.state.userId} avatarId={this.state.avatarId} handleLogout={this.handleLogout} />}/>
              <Route username={this.state.name} path="/games" component={GamePageLayout} />
              <Route path="/profile*" component={Profile} />
              <Route path="*" component={Error} />
            </Switch>
          ) 
          : (
            <Switch>
              <Route exact path="/" render={() => <Login handleChange={this.handleChange} />} />
              <Route path="/register" component={Register} />
              <Redirect from='/feed' to='/' />
              <Route path="*" component={Error} />
            </Switch>
          )}
        
      </div>
    );
  }
}