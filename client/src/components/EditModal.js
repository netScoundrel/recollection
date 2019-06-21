import React, { Component } from 'react';
import {Modal, Button, ButtonToolbar } from 'react-bootstrap';

export class EditModal extends Component{
    state = {
        title: "",
        text: ""
      }


    render(){
        
        return(
            <React.Fragment>
                <MyVerticallyCenteredModal
                    show={this.props.showModal}
                    onHide={this.props.modalClose}
                />
            </React.Fragment>
        )
    }   
}

class MyVerticallyCenteredModal extends React.Component {
    render() {
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
  
  class App extends React.Component {
    constructor(...args) {
      super(...args);
  
      this.state = { modalShow: false };
    }
  
    render() {
      
  
      return (
        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ modalShow: true })}
          >
            Launch vertically centered modal
          </Button>
  
          
        </ButtonToolbar>
      );
    }
  }
  