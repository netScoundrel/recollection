import React from 'react';
import { Nav } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import './Header.css';
import logo from '../img/instagram2.svg';
import { Search } from './Search';
import { User } from './User';

export default function Header(props) {
  return (
    <header className="App-header">
      <nav className="nav">
        <div className="logo">
          <img src={logo} height="48" alt="logo"/>
          <span>rec</span>
        </div>
        <div className="menu">
          <Nav className="mr-auto">
            <LinkContainer to="/feed"><Nav.Link className="menu-item">Feed</Nav.Link></LinkContainer>
            <LinkContainer to="/profile/id:0"><Nav.Link className="menu-item">Profile</Nav.Link></LinkContainer>
            <LinkContainer to="/games"><Nav.Link className="menu-item">Games</Nav.Link></LinkContainer>  
          </Nav>
        </div>
        <div className="right-menu">
            <Search/>
            <User handleLogout={props.handleLogout} />
        </div>
      </nav>
    </header>
  )
}


