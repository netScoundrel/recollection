import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../Auth';
import './Login.css';


import {
  Form, Icon, Input, Button,
} from 'antd';

class Login extends React.Component {
  // Initializing important variables
  constructor(domain){
    super(domain);
    //THIS LINE IS ONLY USED WHEN YOU'RE IN PRODUCTION MODE!
    this.domain = domain || "http://localhost:3000"; // API server domain
  }
  
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/api/login', values)
            .then((res) => {                
                if(res.data.success === true){
                  this.props.handleChange();
                  window.localStorage.setItem("auth_token", res.data.token);
                }
            })
            .catch((err) => {
                console.log(err);
            })
      }
    });
  }

  render() {

    const { getFieldDecorator } = this.props.form;


    return (
      
      <Form onSubmit={this.handleSubmit} id="help" className="login-form" method="POST" action="/api/login">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{type: 'email', message: 'The input is not valid E-mail'}, { required: true, message: 'Please input your email!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail:" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password:" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>

    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;

