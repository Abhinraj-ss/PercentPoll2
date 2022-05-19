import {React, useState} from 'react'
import DateTimePicker from 'react-datetime-picker'

function CreatePoll() {
  const [opening, setOpening] = useState(new Date());
  const [closing, setClosing] = useState(new Date());
  return (
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title h4" id="contained-modal-title-vcenter">CREATE POLL
        </div>
        <button class="btn-close">
        </button>
      </div>
      <div class="modal-body">
        <form class="">
          <div class="mb-3 form-group">
            <label class="form-label">Title Text</label>
            <input required="" placeholder="Enter title text" type="email" class="form-control" value=""/>
          </div>
          <div class="mb-3 form-group"><label class="form-label">Poll Option</label>
            <input required="" placeholder="Poll Option" type="password" class="form-control" value=""/>
          </div>
          <div class="mb-3 form-group"><label class="form-label">Poll Option</label>
            <input required="" placeholder="Poll Option" type="password" class="form-control" value=""/>
          </div>
          <button type="button" class="btn btn-primary">Add Poll Option</button>
          <div class="mb-3 form-group"><label class="form-label">Opens on</label>
            <DateTimePicker required="" placeholder="Opening time" type="datetime" class="form-control" onChange={setOpening} value={opening}/>
          </div>
          <div class="mb-3 form-group"><label class="form-label">Closes on</label>
            <DateTimePicker required="" placeholder="Closing time" type="datetime" class="form-control" onChange={setClosing} value={closing}/>
          </div>
        </form>
      </div>
      <div className="d-grid gap-2 col-6 mx-auto">
        <button type="button" class="btn btn-primary">Create</button>
      </div>
    </div>
  )
}

export default CreatePoll