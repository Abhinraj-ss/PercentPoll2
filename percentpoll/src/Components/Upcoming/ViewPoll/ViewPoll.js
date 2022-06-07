import React,{useState, useEffect} from 'react'
import { Button,Modal, ListGroup, ListGroupItem } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

import './ViewPoll.css'
import ModifyPoll from './ModifyPoll'
function ViewPoll(props) {
  const [show,setShow] = useState(false)
  const [pollOptionList ,setPollOptionList] = useState([])
  const pollOptionsArr=JSON.parse(props.pollData.pollOptions)
  
  useEffect(() => {
    for (let index = 0; index < pollOptionsArr.length; index++) {
      pollOptionList.push({pollOption:pollOptionsArr[index]})
    }
  }, [])
  
  const handleClickCancel = () =>{
    props.handleModalView()
  }

  const handleClickModify =() =>{
    setShow(!show)
  }
  console.log(props.pollData)
  console.log(pollOptionList)

  return (
    <>
      {show && <ModifyPoll handleModalView={handleClickCancel} mPoll_id={props.pollData.poll_id} closeModifyPoll={setShow} mTitle={props.pollData.title} mPollOptionList={pollOptionList} mOpeningDate={props.pollData.open_date} mOpeningTime={props.pollData.open_time} mClosingDate={props.pollData.close_date} mClosingTime={props.pollData.close_time}/>}
    <Modal show={props.show} fullscreen={props.show} onHide={handleClickCancel}>
        <Modal.Header closeVariant="white" closeButton>
          <Modal.Title>View poll</Modal.Title>
        </Modal.Header>
        <Modal.Body className=''>
        <h2>Title - {props.pollData.title}</h2>
        <hr/>
        <h5>Poll Options.</h5>
          <ListGroup>
            {pollOptionsArr.map((option,index)=>(
              <ListGroupItem key={index} className='my-2'>
              {index+1}  {option}
              </ListGroupItem>
            ))
            }
          </ListGroup>
          <div className='row mt-auto pt-4'>
              <div className='col'>
                    <h5>
                      <div id='sub'>
                      Opening On  
                      </div> {props.pollData.open_date} {props.pollData.open_time.substring(0,8)}</h5>
              </div>
              <div className='col' id='closing'>
                  <h5>
                    <div id="sub">
                    Closing On 
                    </div> {props.pollData.close_date} {props.pollData.close_time.substring(0,8)}</h5>
              </div>
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant='outline-danger' size='lg' onClick={handleClickCancel}>Cancel</Button>
            <Button type="button" variant='outline-primary' id="btnModify" size='lg' onClick={handleClickModify}>Modify</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewPoll