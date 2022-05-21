import React from 'react'

function Register({closeRegister}) {
  return (
    <div class="modal-dialog modal-dialog-centered">
        <div className='modal-content'>

        <div class="modal-header">
        <div class="modal-title h4" id="contained-modal-title-vcenter">REGISTER
        </div>
        <button class="btn-close" onClick={()=>closeRegister(false)}>
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
        <button type="button-submit" class="btn btn-primary" onClick={()=>closeRegister(false)}>Register</button>
      </div>
    </div>
    </div>
  )
}

export default Register