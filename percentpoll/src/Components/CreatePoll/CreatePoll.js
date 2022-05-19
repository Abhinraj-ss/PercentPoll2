import React from 'react'
import  './CreatePoll.css';
function CreateNew(){
  return(
  <div class="modal-content">
      <div class="modal-header">
      <div class="modal-title h4" id="contained-modal-title-vcenter">Register
      </div>
      <button class="btn-close">
      </button>
    </div>
    <div class="modal-body">
      <form class="">
        <div class="mb-3 form-group">
          <label class="form-label">Email address</label>
          <input required="" placeholder="Enter email" type="email" class="form-control" value=""/>
        </div>
        <div class="mb-3 form-group"><label class="form-label">Password</label>
          <input required="" placeholder="Password" type="password" class="form-control" value=""/>
        </div>
        <div class="mb-3 form-group"><label class="form-label">Confirm Password</label>
          <input required="" placeholder="Password" type="password" class="form-control" value=""/>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary">Register</button>
    </div>
  </div>
  )
}
function CreatePoll() {
  return (
    <div>
        <button onClick={CreateNew()} class="btn btn-primary btn-lg" id="create" >CreatePoll</button>
        <hr/>
    </div>
  )
}

export default CreatePoll