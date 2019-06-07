import React, { Component } from 'react';
import Header from './Header';
import Content from './Content';

export class Layout extends Component {
  static displayName = Layout.name;
  

  render () {
    return (
      <React.Fragment>
        <Header />
        <Content username={this.props.username} />
      </React.Fragment>
    )}
}
