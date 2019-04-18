import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';

class Register extends React.Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        axios.post('/api/login', values)
            .then((res) => {
                console.log(res);
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
      
      <Form onSubmit={this.handleSubmit} id="help" className="login-form">
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
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>

    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Register);

export default WrappedNormalLoginForm;

ReactDOM.render(<WrappedNormalLoginForm />, document.querySelector('#root'));
