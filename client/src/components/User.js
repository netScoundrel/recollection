import React from 'react';
import logo from '../img/276363.png';
import './User.css';
import Auth from '../Auth';


export class User extends React.Component {
  constructor(){
    super()

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.props.handleLogout();
  }

  render() {
    return (
      <React.Fragment>
        <img className="img-logo" src={logo} height="39" alt="logo" style={{"marginLeft": "11px"}} onClick={this.handleClick}/>
      </React.Fragment>
    )
  }
}
