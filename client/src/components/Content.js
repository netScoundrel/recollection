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


  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/post', this.state)
      .then((res) => {
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

