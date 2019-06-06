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


export default class App extends Component {

  static displayName = App.name;

  constructor(){
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    isLoggedIn: false,
    name: ""
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
            this.setState({isLoggedIn: true, name: res.data.authDate.username});
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
          <Route exact path="/" component={WrappedNormalLoginForm} />
          <Route path="/register" component={WrappedRegistrationForm} />
          <Route path="/feed" component={Layout} />
          <Route path="*" component={Error} />
        </Switch>
      </div>
    );
  }
}