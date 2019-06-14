import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';


export class Login extends React.Component {
  // Initializing important variables
  constructor(domain){
    super(domain);
    //THIS LINE IS ONLY USED WHEN YOU'RE IN PRODUCTION MODE!
    this.domain = domain || "http://localhost:3000"; // API server domain

    this.emailHandleChange = this.emailHandleChange.bind(this);
    this.passwordHandleChange = this.passwordHandleChange.bind(this);
  }

  state = {
    email: '',
    password: ''
  }


  
  handleSubmit = (e) => {
    e.preventDefault();
    let values = {email : this.state.email, password: this.state.password};
    axios.post('/api/login', values)
        .then((res) => {                
            if(res.data.success === true){
              this.props.handleChange(res.data.username, res.data.userId, res.data.avatarId);
              window.localStorage.setItem("auth_token", res.data.token);

              this.context.history.push('/feed');
            }
        })
        .catch((err) => {
            console.log(err);
        })
  }

  emailHandleChange = (e) => {
    this.setState({email: e.target.value})
  }

  passwordHandleChange = (e) => {
    this.setState({password: e.target.value})
  }

  render() {

    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-55">
                  Login
              </span>

              <div className="wrap-input100 validate-input m-b-16" data-validate="Valid email is required: ex@abc.xyz">
                <input className="input100" type="text" name="email" placeholder="Email" onChange={this.emailHandleChange} />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <span className="lnr lnr-envelope" />
                </span>
              </div>

              <div className="wrap-input100 validate-input m-b-16" data-validate="Password is required">
                <input className="input100" type="password" name="pass" placeholder="Password" onChange={this.passwordHandleChange} />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <span className="lnr lnr-lock" />
                </span>
              </div>

              <div className="contact100-form-checkbox m-l-4">
                <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                <label className="label-checkbox100" htmlFor="ckb1">
                    Remember me
                </label>
              </div>

              <div className="container-login100-form-btn p-t-25">
                <button className="login100-form-btn" onClick={this.handleSubmit}>
                    Login
                </button>
              </div>

              <div className="text-center w-full p-t-42 p-b-22">
                <span className="txt1">
                    Or login with
                </span>
              </div>
              <a href="#" className="btn-face m-b-10">
                <i className="fa fa-facebook-official" />
                  Facebook
              </a>
              <a href="#" className="btn-google m-b-10">
                <img src="images/icons/icon-google.png" alt="GOOGLE" />
                  Google
              </a>
                <div className="text-center w-full p-t-115">
                  <span className="txt1">
                    Not a member?
                  </span>
                  <Link className="txt1 bo1 hov1" to="/register" style={{marginLeft: 5}}>
                    Sign up now							
                  </Link>
              </div>
              </form>
            </div>
          </div>
      </div>

    );
  }
}


