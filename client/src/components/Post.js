import { Card } from 'antd';
import { ThreeDots } from './ThreeDots';


import React, { Component, useImperativeHandle } from 'react';

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
          <ThreeDots id={this.props.id} username={this.props.username} fetchData={this.props.fetchData} userId={this.props.userId} ownerId={this.props.ownerId} />
        </div>
        <div className="post-content">
          <p>{text}</p>
        </div>
      </div>
    )
  }
}
