import React, { Component } from 'react';
import Header from './Header';
import GameContent from './GameContent';

export class GamePageLayout extends Component {
  static displayName = GamePageLayout.name;
  

  render () {
    return (
      <React.Fragment>
        <Header />
        <GameContent />
      </React.Fragment>
    )}
}