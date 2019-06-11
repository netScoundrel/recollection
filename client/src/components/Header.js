import React from 'react';
import { Nav } from 'react-bootstrap';
import './Header.css';
import logo from '../img/instagram2.svg';
import { Search } from './Search';
import { User } from './User';

export default function Header() {
  return (
    <header className="App-header">
      <nav className="nav">
        <div className="logo">
          <img src={logo} height="48" alt="logo"/>
          <span>rec</span>
        </div>
        <div className="menu">
          <Nav className="mr-auto">
            <Nav.Link className="menu-item" href="/feed">Feed</Nav.Link>
            <Nav.Link className="menu-item" href="/profile">Profile</Nav.Link>
            <Nav.Link className="menu-item" href="/games">Games</Nav.Link>
          </Nav>
        </div>
        <div className="right-menu">
            <Search/>
            <User />
        </div>
      </nav>
    </header>
  )
}


