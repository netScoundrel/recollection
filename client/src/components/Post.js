import { ThreeDots } from './ThreeDots';


import React, { Component, useImperativeHandle } from 'react';

import './Post.css';
import logo from '../img/sun.svg';

export class Post extends Component {
  render() {

      const title = this.props.title;
      const text = this.props.text;


      const avatarId = this.props.avatarId;
      const path = `images/avatars/${avatarId}.png`;

    return (
      // <div className="post-wrapper">
      //   <div className="post-header">
      //     <div className="post-user">
      //       <img src={logo} height="35" alt="logo"/>
      //     </div>
      //     <h4>{title}</h4>
      //     <ThreeDots id={this.props.id} username={this.props.username} fetchData={this.props.fetchData} userId={this.props.userId} ownerId={this.props.ownerId} />
      //   </div>
      //   <div className="post-content">
      //     <p>{text}</p>
      //   </div>
      // </div>


      <div className="container-post">
  <div className="col-md">
    <div className="panel panel-default">
      <div className="panel-body">
        <section className="post-heading">
          <div className="row">
            <div className="col-md-11">
              <div className="media">
                <div className="media-left">
                  <a href="#">
                    <img className="media-object photo-profile" src={path} width={40} height={40} alt="..." />
                  </a>
                </div>
                <div className="media-body">
                  <a href="#" className="anchor-username"><h4 className="media-heading">Owner</h4></a> 
                  <a href="#" className="anchor-time">51 mins</a>
                </div>
              </div>
            </div>
            <div className="col-md-1">
              <a href="#"><i className="glyphicon glyphicon-chevron-down" /></a>
            </div>
          </div>             
        </section>
        <section className="post-body">
          <span class="post-title">{this.props.title}</span>
          <p>{this.props.text}</p>
        </section>
        <section className="post-footer">
          <hr />
          <div className="post-footer-option container">
            <ul className="list-unstyled">
              <li><a href="#"><i className="glyphicon glyphicon-thumbs-up" /> Like num</a></li>
              <li><a href="#"><i className="glyphicon glyphicon-comment" /> Comments</a></li>
            </ul>
          </div>
          <div className="post-footer-comment-wrapper">
            <div className="comment-form">
            </div>
            <div className="comment">
            </div>
          </div>
        </section>
      </div>
    </div>   
  </div>
</div>

    )
  }
}
