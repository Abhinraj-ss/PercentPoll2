import React from 'react'
import { Button,Modal, ListGroup, ListGroupItem } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

import './ViewPoll.css'

function ViewPoll(props) {
  return (
    <>
    <Modal show={props.show} fullscreen={props.show} onHide={()=>props.handleModalView()}>
        <Modal.Header closeVariant="white" closeButton>
          <Modal.Title>View poll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          
        </Modal.Body>
        <Modal.Footer>
            <Button type="button" class="btn btn-primary">Modify</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewPoll