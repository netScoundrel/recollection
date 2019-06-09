import {Icon} from 'antd';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import './ThreeDots.css';

import React, { Component } from 'react';

export class ThreeDots extends Component {
    constructor(){
        super();

        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    handleClickDelete = () => {
            
    }


    render() {

        return (
            <DropdownButton drop="left" title="...">
                <Dropdown.Item eventKey="1"> <Icon type="edit" />  Edit</Dropdown.Item>
                <Dropdown.Item onClick={this.handleClickDelete} eventKey="2"> <Icon type="delete" />  Delete</Dropdown.Item>
            </DropdownButton>
        )
    }
}
