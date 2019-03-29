import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav } from 'react-bootstrap';
import Search from './Search';
import './components_css/NavMenu.css';

export class NavMenu extends Component {

  render () {
    return (
      <header className="navigation">
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Recollection</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto nv" variant="pills" defaultActiveKey="#home">
                <Nav.Link className="px-3" href="#feed">Feed</Nav.Link>
                <Nav.Link className="px-3" href="#stories">Stories</Nav.Link>
                <Nav.Link className="px-3 search"><Search /></Nav.Link>
                <Nav.Link className="px-3" href="#account">Account</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}