import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import GameContent from './GameContent';

export class Games extends Component {
  static displayName = Games.name;
  

  render () {
    return (
        <React.Fragment>
            <Header />
            <p>Coolid mängud</p>
        </React.Fragment>
    )}
}
