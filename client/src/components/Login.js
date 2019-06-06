import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      <React.Fragment>
      <div className="header">
        <h1>Welcome to Recollection</h1>
      </div>
      <div className="intro">
        <h5>Recollection is a blog.</h5> 
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in nibh nulla. Nullam facilisis eget purus vitae ornare. Quisque pulvinar in dui vel semper. 
        Etiam mattis, justo in rhoncus tincidunt, ante augue pulvinar dui, vitae sollicitudin nunc arcu pharetra arcu. Mauris semper elit a aliquam varius. Curabitur ornare lobortis eros eu viverra. 
        Proin euismod, augue quis viverra consequat, lacus velit feugiat quam, eget blandit nisl lectus et nibh. Phasellus nec turpis at orci fermentum pretium. Aliquam at mauris ipsum. Etiam quis nibh nec 
        nibh vestibulum gravida.</p>
        <p>Donec feugiat massa nec sagittis condimentum. Donec porttitor vulputate mattis. Integer quis erat in augue feugiat hendrerit a nec neque. Quisque congue molestie nunc, sed placerat lorem tristique a. 
        Etiam in suscipit nunc. Phasellus sed eros at dui fermentum commodo. Pellentesque vitae accumsan arcu. Donec porta venenatis libero, id elementum erat dictum at. Vivamus at tellus in nunc mollis ultrices 
        in at augue. Fusce vel volutpat arcu.</p>
        <p>Donec rhoncus lobortis purus, id pulvinar ante lacinia auctor. Nunc vitae velit enim. Morbi consequat nulla ante, vitae mattis ante efficitur vel. Nulla facilisi. Fusce ac leo in odio malesuada 
        vestibulum. Nullam dolor justo, vulputate quis fringilla sit amet, facilisis sed erat. Donec tempus nisi eu libero.</p>
      </div>
      <Form onSubmit={this.handleSubmit} id="help" className="login-form" method="POST" action="/api/login">
        <h5>Start using Recollection now!</h5>
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
      </React.Fragment>

    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;

