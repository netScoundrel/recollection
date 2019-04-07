import React, { Component } from 'react';
import { Layout } from './components/Layout';
import './scss/custom.css';
import 'antd/dist/antd.css';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout />
    );
  }
}
