import React, { Component } from 'react';
import { Layout } from './components/Layout';
import 'antd/dist/antd.css';
import WrappedNormalLoginForm from './components/Login';
import {Switch, Redirect, Route} from 'react-router-dom';
import WrappedRegistrationForm from './components/Register';
import ProfilePage from './components/Profile';
import ErrorPage from './components/Error';
import AddPostPage from './components/AddNewPost';
import Feed from './components/Feed';
import './App.css';
import axious from 'axios';
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
    name: ""
  }

  handleChange(){
    Auth.login(() => {});
    this.setState({auth: Auth.authenticated});
  }

  componentDidMount(){
    let token = window.localStorage.auth_token;
    if(token){
      axious.post('api/check-auth', {token})
        .then((res) => {
          if(res.data.success = true){
            Auth.login(() => {});
            this.setState({auth: Auth.authenticated, name: res.data.authDate.username});
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
        <Switch>
          <Route exact path="/" render={() => <WrappedNormalLoginForm handleChange={this.handleChange} />} />
          <Route path="/register" component={WrappedRegistrationForm} />
          <ProtectedRoute username={this.state.name} exact path="/feed" component={Layout} />
          <Route path="*" component={Error} />
        </Switch>
      </div>
    );
  }
}