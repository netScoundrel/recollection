import React, { Component } from 'react';

export default class Search extends Component {

  constructor(){
    super();

    this.state = {
      isCollapsed: true,
      isClickable: true
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    e.preventDefault();
  }

  handleClick(e){
    e.preventDefault();
    const field = document.querySelector('#field');

    this.setState({
      isCollapsed: !this.state.isCollapsed,
      isClickable: !this.state.isClickable,
    });

    document.querySelector('#field').setAttribute('style', 'visibility: visible;');
    document.querySelector('.bar').setAttribute('style', 'border: .9px white solid; background-color: #141414;');

    setTimeout(()=> {
      field.focus();
    }, 120)
  }


  handleBlur(e){
    e.preventDefault();

    this.setState({
      isCollapsed: true,
      isClickable: true
    })

    document.querySelector('.bar').setAttribute('style', 'border: none;');
    document.querySelector('#field').setAttribute('style', 'visibility: hidden;');
  }
  

  render() {
    const isCollapsed = this.state.isCollapsed ? 'hide' : 'show';
    const isClickable = this.state.isClickable ? '' : 'unclickable';

    return (
        <div id="wrap">
            <form action="" autoComplete="on">

              <div className="bar">
                <button className={isClickable} onClick={this.handleClick} type="submit">
                  <i className="fas fa-search"></i>
                </button>
                <input id="field" onChange={this.handleChange} onBlur={this.handleBlur} name="search" className={isCollapsed} type="text" placeholder="..."/>
              </div>
            </form>
        </div>
    )
  }
}
