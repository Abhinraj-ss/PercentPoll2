import React from 'react'

function LogIn() {
  return (
    <div class="modal-content">
        <div class="modal-header">
        <div class="modal-title h4" id="contained-modal-title-vcenter">LOG IN
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
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Log In</button>
      </div>
    </div>
  )
}

export default LogIn