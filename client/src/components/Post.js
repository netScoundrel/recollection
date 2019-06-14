import { ThreeDots } from './ThreeDots';
import axios from 'axios';


import React, { Component, useImperativeHandle } from 'react';

import './Post.css';


export class Post extends Component {

  state = {
    avatarId: '0',
    username: 'Owner'
  }

  componentDidMount(){
    axios.post('/api/load-avatar', {ownerId: this.props.ownerId})
      .then((res) => {
        this.setState({avatarId: res.data.avatarId, username: res.data.username})
      })
      .catch((err) => console.log(err.message))
  }

  handleLikes = () => {
    const userIds = this.props.likes.userId || [];
    const isLikedByYou = userIds.includes(this.props.userId || false);


    axios.post('/api/like', {userId: this.props.userId, postId: this.props.id})
      .then((res) => console.log())
      .catch((err) => console.log(err.message))
  }

  render() {

      const title = this.props.title;
      const text = this.props.text;

      const path = `images/avatars/${this.state.avatarId}.png`;
      

      const userIds = this.props.likes.userId || [];
      const isLikedByYou = userIds.includes(this.props.userId) || false;
      const className = isLikedByYou ? "post-liked" : "";
      

    return (

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
                  <a href="#" className="anchor-username"><h4 className="media-heading">{this.state.username}</h4></a> 
                  <a href="#" className="anchor-time">51 mins</a>
                </div>
              </div>
            </div>
            <div className="col-md-1">
              <ThreeDots id={this.props.id} username={this.props.username} fetchData={this.props.fetchData} userId={this.props.userId} ownerId={this.props.ownerId} />
            </div>
          </div>             
        </section>
        <section className="post-body">
          <span className="post-title">{this.props.title}</span>
          <p className="post-text">{this.props.text}</p>
        </section>
        <section className="post-footer">
          <hr />
          <div className="post-footer-option container">
            <ul className="list-unstyled">
              <li><p className={className}><i className="glyphicon glyphicon-thumbs-up" onClick={this.handleLikes}/> {userIds.length}</p></li>
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
