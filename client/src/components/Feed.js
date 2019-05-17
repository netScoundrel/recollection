import React, { Component } from 'react';
import {Form, Col, Row, Button} from 'react-bootstrap';
import { Post } from './Post';
import axios from 'axios';

import './Content.css';

export default class Content extends Component {

  state = {
    title: "",
    text: "",
    posts: []
  }

  componentDidMount(){
    

    axios.post('/api/fetch-posts', null)
      .then((res) => {
        this.setState({posts: res.data});
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    const interval = setInterval(() => {
      axios.post('/api/fetch-posts', null)
      .then((res) => {
        this.setState({posts: res.data});
      })
      .catch((err) => console.log(err));
    }, 15000)
  }

  handleTitleChange = (e) => {
    this.setState({title: e.target.value});
  }

  handleTextChange = (e) => {
    this.setState({text: e.target.value});
  }


  render() {

    return (
      <div className="feed-content">
        <div className="feed">

          {
            this.state.posts.map(post => 
              <Post title={post.title} text={post.text} />
              )
          }
          
        </div>
      </div>
    )
  }
}

