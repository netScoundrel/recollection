import React from 'react';
import { Link } from 'react-router-dom';

    
  export class Register extends React.Component {
    constructor(){
      super();

      this.usernameHandleChange = this.usernameHandleChange.bind(this);
      this.emailHandleChange = this.emailHandleChange.bind(this);
      this.passwordHandleChange = this.passwordHandleChange.bind(this);
    }


    state = {
      username: "",
      email: "",
      password: "",
      confirm: ""
    };
  
    handleSubmit = (e) => {
      // e.preventDefault();
      // this.props.form.validateFieldsAndScroll((err, values) => {
      //   if (!err) {
      //     console.log('Received values of form: ', values);

      //     axios.post('api/register', values)
      //     .then((res) => {
      //         console.log(res);
              
      //         this.setState(prevState => ({
      //           redirectToLogIn: !prevState.redirectToLogIn
      //         }));

      //     })
      //     .catch((err) => {
      //         console.log(err);
      //     })
      //   }
      // });
    }

    usernameHandleChange = (e) => {
      this.setState({username: e.target.value})
    }

    emailHandleChange = (e) => {
      this.setState({email: e.target.value})
    }
  
    passwordHandleChange = (e) => {
      this.setState({password: e.target.value})
    }

    confirmHandleChange = (e) => {
      this.setState({confirm: e.target.value})
    }
  
    render() {

      return (
        <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-55">
                  Sign Up
              </span>

              <div className="wrap-input100 validate-input m-b-16" data-validate="Valid username is required: ex@abc.xyz">
                <input className="input100" type="text" name="username" placeholder="Username" onChange={this.usernameHandleChange} />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <span className="lnr lnr-user" />
                </span>
              </div>

              <div className="wrap-input100 validate-input m-b-16" data-validate="Valid email is required: ex@abc.xyz">
                <input className="input100" type="text" name="email" placeholder="Email" onChange={this.emailHandleChange} />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <span className="lnr lnr-envelope" />
                </span>
              </div>

              <div className="wrap-input100 validate-input m-b-16" data-validate="Password is required">
                <input className="input100" type="password" name="password" placeholder="Password" onChange={this.passwordHandleChange} />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <span className="lnr lnr-lock" />
                </span>
              </div>

              <div className="wrap-input100 validate-input m-b-16" data-validate="Password is required">
                <input className="input100" type="password" name="confirm" placeholder="Confirm Password" onChange={this.confirmHandleChange} />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <span className="lnr lnr-lock" />
                </span>
              </div>

              {/* <div className="contact100-form-checkbox m-l-4">
                <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                <label className="label-checkbox100" htmlFor="ckb1">
                    Agree with terms
                </label>
              </div> */}

              <div className="container-login100-form-btn p-t-25">
                <button className="login100-form-btn" onClick={this.handleSubmit}>
                    SIGN UP
                </button>
              </div>

              
              <div className="text-center w-full p-t-115">
                  <span className="txt1">
                    Already a member?
                  </span>
                  <Link className="txt1 bo1 hov1" to="/" style={{marginLeft: 5}}>
                    Log in now							
                  </Link>
              </div>
              </form>
            </div>
          </div>
      </div>
      );
    }
  }
