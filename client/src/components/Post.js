import { ThreeDots } from './ThreeDots';


import React, { Component, useImperativeHandle } from 'react';

import './Post.css';
import logo from '../img/sun.svg';

export class Post extends Component {
  render() {

      const title = this.props.title;
      const text = this.props.text;

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


      <div className="container">
  <div className="col-md-5">
    <div className="panel panel-default">
      <div className="panel-body">
        <section className="post-heading">
          <div className="row">
            <div className="col-md-11">
              <div className="media">
                <div className="media-left">
                  <a href="#">
                    <img className="media-object photo-profile" src="http://0.gravatar.com/avatar/38d618563e55e6082adf4c8f8c13f3e4?s=40&d=mm&r=g" width={40} height={40} alt="..." />
                  </a>
                </div>
                <div className="media-body">
                  <a href="#" className="anchor-username"><h4 className="media-heading">Bayu Darmantra</h4></a> 
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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras 
            turpis sem, dictum id bibendum eget, malesuada ut massa. Ut scel
            erisque nulla sed luctus dapibus. Nulla sit amet mi vitae purus sol
            licitudin venenatis. Praesent et sem urna. Integer vitae lectus nis
            l. Fusce sapien ante, tristique efficitur lorem et, laoreet ornare lib
            ero. Nam fringilla leo orci. Vivamus semper quam nunc, sed ornare magna dignissim sed. Etiam interdum justo quis risus
            efficitur dictum. Nunc ut pulvinar quam. N
            unc mollis, est a dapibus dignissim, eros elit tempor diam, eu tempus quam felis eu velit.</p>
        </section>
        <section className="post-footer">
          <hr />
          <div className="post-footer-option container">
            <ul className="list-unstyled">
              <li><a href="#"><i className="glyphicon glyphicon-thumbs-up" /> Like</a></li>
              <li><a href="#"><i className="glyphicon glyphicon-comment" /> Comment</a></li>
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
