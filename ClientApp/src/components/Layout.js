import React, { Component } from 'react';
import  {NavMenu}  from './NavMenu';
import { Feed } from './Feed';
import { FetchData } from './FetchData';
import { Counter } from './Counter';
import  Footer  from './Footer';
import {Switch, Redirect, Route} from 'react-router-dom';



export class Layout extends Component {
  static displayName = Layout.name;
  

  render () {
    return (
      <section>
        <NavMenu />
        <main>
        <Switch>
            <Redirect exact from="/" to="/feed" />
            <Route path="/feed" component={Feed}/>
            <Route path="/stories" component={Counter}/>
            <Route path="/account" component={FetchData}/>
        </Switch>
        </main>
        <Footer />
      </section>
    );
  }
}
