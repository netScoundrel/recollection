import {Icon} from 'antd';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import './ThreeDots.css';

import React, { Component } from 'react';
import axios from 'axios';

export class ThreeDots extends Component {
    constructor(){
        super();


        this.handleClick = this.handleClick.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);

    }

    state = {
        show: false
    }

    handleClick = () => {
        this.setState({show: !this.state.show})
    }

    

    handleClickEdit = () =>{
        axios.post('/api/edit-post', this.props)
            .then((res) => {

            })
            .catch((err) => console.log(err.message))
        this.props.fetchData();
    }

    handleClickDelete = () => {
        axios.post('/api/delete-post', this.props)
            .then((res) => {
                
            })
            .catch((err) => console.log(err.message))

        this.props.fetchData();
    }


    render() {

        

        const hasRightToEdit = this.props.userId === this.props.ownerId ? true : false;
        return (
                <React.Fragment>
                    <i className="glyphicon glyphicon-chevron-down i" onClick={this.handleClick}/>
                    <Dropdown.Menu show={this.state.show}>
                        {hasRightToEdit ?(
                            <React.Fragment>
                                <Dropdown.Item onClick={this.handleClickEdit} eventKey="1"> <Icon type="edit" />  Edit</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleClickDelete} eventKey="2"> <Icon type="delete" />  Delete</Dropdown.Item>
                            </React.Fragment>
                        ) : (
                        <Dropdown.Item eventKey="3"> <Icon type="warning" />  Report</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </React.Fragment>
        )
    }
}
