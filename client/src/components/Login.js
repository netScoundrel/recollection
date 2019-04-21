import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link, Router } from 'react-router-dom';



import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';

class Login extends React.Component {
  
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        axios.post('/api/login', values)
            .then((res) => {
                console.log(res.data);
                if(res.data.isLoggedIn === true){
                  this.props.handleChange();
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
          {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )} */}
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

