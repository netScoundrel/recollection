import { Card } from 'antd';


import React, { Component } from 'react';

import './Post.css';
import logo from '../img/sun.svg';

export class Post extends Component {
  render() {

      const title = this.props.title;
      const text = this.props.text;

    return (
      <div className="post-wrapper">
        <div className="post-header">
          <div className="post-user">
            <img src={logo} height="35" alt="logo"/>
          </div>
          <h4>{title}</h4>
        </div>
        <div className="post-content">
          <p>{text}</p>
        </div>
      </div>
    )
  }
}
