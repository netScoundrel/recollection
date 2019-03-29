import React, { Component } from 'react';
import './components_css/Search.css';

export default class Search extends Component {

  constructor(){
    super();

    this.state = {
      isCollapsed: true,
      isClickable: true
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  

  handleClick(e){
    e.preventDefault();
    const field = document.querySelector('#field');

    this.setState({
      isCollapsed: !this.state.isCollapsed,
      isClickable: !this.state.isClickable,
    });

    field.focus();
    document.querySelector('.bar').setAttribute('style', 'border: 2px white solid; background-color: #141414;')
  }

  handleBlur(e){
    e.preventDefault();

    this.setState({
      isCollapsed: !this.state.isCollapsed,
      isClickable: !this.state.isClickable
    })
    document.querySelector('.bar').setAttribute('style', 'border: none;')
  }
  

  render() {
    const isCollapsed = this.state.isCollapsed ? 'hide' : 'show';
    const isClickable = this.state.isClickable ? '' : 'unclickable';

    return (
        <div id="wrap">
            <form action="" autocomplete="on">

              <div className="bar">
                <button className={isClickable} onClick={this.handleClick} type="submit">
                  <i class="fas fa-search"></i>
                </button>
                <input id="field" onBlur={this.handleBlur} name="search" className={isCollapsed} type="text" placeholder="..."/>
              </div>
            </form>
        </div>
    )
  }
}
