import React from 'react';
import logo from '../img/sun.svg';
import './User.css';

export function User() {
  return (
    <React.Fragment>
      <img className="img-logo" src={logo} height="39" alt="logo" style={{"marginLeft": "11px"}}/>
    </React.Fragment>
  )
}
