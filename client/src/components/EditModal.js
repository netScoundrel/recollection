import React, { Component } from 'react';

export class EditModal extends Component{
    state = {
        title: "",
        text: ""
      }

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
                    <h4>Title</h4>
                <p>
                    Text
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
        let modalClose = () => this.setState({ modalShow: false });
    
        return (
        <ButtonToolbar>
            <Button
            variant="primary"
            onClick={() => this.setState({ modalShow: true })}
            >
            Launch vertically centered modal
            </Button>
    
            <MyVerticallyCenteredModal
            show={this.state.modalShow}
            onHide={modalClose}
            />
        </ButtonToolbar>
        );
    }
}
    
render(<App />);