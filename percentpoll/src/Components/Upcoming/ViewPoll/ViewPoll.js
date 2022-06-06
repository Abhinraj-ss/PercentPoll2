import React,{useState} from 'react'
import { Button,Modal, ListGroup, ListGroupItem } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

import './ViewPoll.css'
import CreatePoll from '../../CreatePoll/CreatePoll';

function ViewPoll(props) {
  const [show,setShow] = useState(false)
  const pollOptionList = [{"pollOption": "df"}]
  const handleClickModify =() =>{
    setShow(!show)
  }


  return (
    <>
      {show && <CreatePoll closeCreatePoll={setShow} mTitle="chumma test" mPollOptionList={pollOptionList} mOpeningDate="2000-11-06" mOpeningTime="12:00:00" mClosingDate="2001-11-06" mClosingTime="12:00:00"/>}
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
            <Button type="button" className="btn btn-primary" onClick={handleClickModify}>Modify</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewPoll