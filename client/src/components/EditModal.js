import React, { Component } from 'react';

export class EditModal extends Component{
    state = {
        title: "",
        text: ""
      }


    render{
        return{
            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Edit</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                        <div className="form-group">
                            <label for="titleInput">Title</label>
                            <input type="text" className="form-control" id="titleInput" placeholder="Your title here" value={this.state.title}>
                        </div>
                        <div className="form-group">
                            <label for="textInput">Text</label>
                            <textarea className="form-control" id="textInput" rows="7" placeholder="Your story here" value={this.state.text}></textarea>
                        </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        }
    }
}
