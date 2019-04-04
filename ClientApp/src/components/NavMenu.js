import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {Navbar, Nav } from 'react-bootstrap';
import Search from './Search';

export class NavMenu extends Component {
  constructor(){
    super();

    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(){    
    const links = document.querySelectorAll('a.px-3');

    setTimeout(()=>{
      for(let i=1; i<4; i++){
        while(links[i].classList.contains('active')){
          links[i].classList.remove('active');
        }
      }
    }, 50)
  }

  render () {
    return (
      <header>
        <Navbar className="navigation" collapseOnSelect expand="md" bg="dark" variant="dark">
            <LinkContainer to="/feed">
              <Navbar.Brand onClick={this.handleClick}>Recollection</Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto nv" variant="pills" >
                <LinkContainer to="/feed" >
                  <Nav.Link className="px-3" id="feed">Feed</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/stories">
                <Nav.Link className="px-3" id="stories" >Stories</Nav.Link>
                </LinkContainer>

                <Search />
                
                <LinkContainer to="/account">
                  <Nav.Link className="px-3" id="account" >Account</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}