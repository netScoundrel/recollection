import React, { Component } from 'react';
import  NavMenu  from './NavMenu';
import { Feed } from './Feed';
import { FetchData } from './FetchData';
import WrappedNormalLoginForm from './Counter';
import  Footer  from './Footer';
import {Switch, Redirect, Route} from 'react-router-dom';
import LeftMenu from './LeftMenu';



export class Layout extends Component {
  static displayName = Layout.name;
  

  render () {
    return (
      <React.Fragment>
        <LeftMenu />
      
        <div className="content">
          <div className="upper-content">
            <NavMenu />
            <Switch>
                <Redirect exact from="/" to="/feed" />
                <Route path="/feed" component={Feed}/>
                <Route path="/stories" component={WrappedNormalLoginForm}/>
                <Route path="/account" component={FetchData}/>
            </Switch>
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    )}
}
