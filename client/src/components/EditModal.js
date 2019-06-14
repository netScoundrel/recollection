import React, { Component } from 'react';

export class EditModal extends Component{
    state = {
        title: "",
        text: ""
      }


    render{
        return{
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <div class="form-group">
                            <label for="titleInput">Title</label>
                            <input type="text" class="form-control" id="titleInput" placeholder="Your title here" value={this.state.title}>
                        </div>
                        <div class="form-group">
                            <label for="textInput">Text</label>
                            <textarea class="form-control" id="textInput" rows="7" placeholder="Your story here" value={this.state.text}></textarea>
                        </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        }
    }
}
