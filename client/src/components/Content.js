import React, { Component } from 'react';
import {Form, Col, Row, Button} from 'react-bootstrap';
import { Post } from './Post';
import axios from 'axios';

import './Content.css';

export default class Content extends Component {

  state = {
    title: "",
    text: "",
    name: this.props.username,
    posts: []
  }

  componentDidMount(){
    
    this.fetchData();
    setInterval(() => {
      this.fetchData();
    }, 1000)
  }


  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/post', this.state)
      .then((res) => {
        this.fetchData();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleTitleChange = (e) => {
    this.setState({title: e.target.value});
  }

  handleTextChange = (e) => {
    this.setState({text: e.target.value});
  }

  fetchData = () => {
    axios.post('/api/fetch-posts', null)
      .then((res) => {
        this.setState({posts: res.data});
      })
      .catch((err) => console.log(err));
  }

  render() {

    return (
      <div className="feed-content">
        <div className="feed">

          {
            this.state.posts.map(post => 
              <Post key={post.postId} id={post.postId} title={post.title} text={post.text} fetchData={this.fetchData} username={this.props.username} userId={this.props.userId} ownerId={post.ownerId} />
              )
          }
          
        </div>

        <div className="right-sidebar">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder=""  onChange={this.handleTitleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Text
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="" onChange={this.handleTextChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Submit</Button>
            </Col>
          </Form.Group>
        </Form>
        </div>
      </div>
    )
  }
}

