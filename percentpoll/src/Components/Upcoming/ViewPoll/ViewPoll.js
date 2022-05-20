import React from 'react'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'

function ViewPoll() {
  return (
    <div className="modal-dialog modal-fullscreen">
         <div class="modal-header">
            <div class="modal-title h4" id="contained-modal-title-vcenter">View poll
            </div>
            <button class="btn-close"/>
      </div>
      <div className='modal-body text-center'>
          <h2>Poll title</h2>
          <ListGroup>
              <ListGroupItem>
                  * Poll option1
              </ListGroupItem>
              <ListGroupItem>
                  * Poll option2
              </ListGroupItem>
              <ListGroupItem>
                  * Poll option3
              </ListGroupItem>
              <ListGroupItem>
                  * Poll option4
              </ListGroupItem>
          </ListGroup>
          <div className='row'>
              <div className='col'>
                    <h4>opening : --/--/--- , --:--</h4>
              </div>
              <div className='col'>
                  <h4>closing : --/--/--- , --:--</h4>
              </div>
          </div>
          
          <div class="modal-footer">
          <button type="button" class="btn btn-primary">Modify</button>
          </div>
      </div>
    </div>
  )
}

export default ViewPoll