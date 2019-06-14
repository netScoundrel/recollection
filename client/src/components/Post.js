import { ThreeDots } from './ThreeDots';
import axios from 'axios';


import React, { Component, useImperativeHandle } from 'react';

import './Post.css';
import logo from '../img/sun.svg';

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
    // const likes = this.props.likes;
    // const { userId } = likes;
    // if(likes.includes(this.props.userId)){
    //   const index = likes.indexOf(this.props.userId);
    //   this.props.changeState(likes.splice(index, 1));
    // }
    // else{
    //   likes.push(this.props.userId);
    // }
  }

  render() {

      const title = this.props.title;
      const text = this.props.text;
      let timeStamp = this.props.publishDate;
      timeStamp = timeStamp.substr(0,19).replace("T", "  ").replace(new RegExp('-', 'g'), '/');
      const date = timeStamp;
      const path = `images/avatars/${this.state.avatarId}.png`;
      
      const userIds = this.props.likes.userId || [];
      const likedByYou = userIds.includes(this.props.id) ? 'glyphicon glyphicon-thumbs-up post-liked' : 'glyphicon glyphicon-thumbs-up';

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
                  <a href="#" className="anchor-time">{date}</a>
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
              <li><a href="#"><i className={likedByYou} onClick={this.handleLikes}/> {userIds.length}</a></li>
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
