import React,{useState, useMemo} from 'react'
import { Button,Modal, ListGroup, ListGroupItem } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

import './ViewPoll.css'
import ModifyPoll from './ModifyPoll'
import eyeIcon from "../../images/eye_aqua.png"


function ViewPoll(props) {
  const [show,setShow] = useState(false)
  const pollOptionsArr=props.pollData.pollOptions
  const pollOptionList = pollOptionsArr.map((pollOption)=>{
    return pollOption
  })
  console.log(pollOptionsArr,pollOptionList)
  function formatDate (input) {
    var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1], day = datePart[2];
  
    return day+'/'+month+'/'+year;
  }
  function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }
  
  tConvert ('18:00:00');

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
          <Modal.Title className='ms-2'>
          <img
                alt=""
                src={eyeIcon}
                width="35"
                height="35"
                className="d-inline-block me-2"
              />
              VIEW POLL</Modal.Title>
        </Modal.Header>
        <Modal.Body className=''>
        <h2>Title - {props.pollData.title}</h2>
        <hr/>
        <h4>Poll Options.</h4>
          <ListGroup>
            {pollOptionsArr.map((option,index)=>(
              <ListGroupItem key={index} className='my-2'>
                <h5>{option.poll_option}</h5>
              </ListGroupItem>
            ))
            }
          </ListGroup>
          <div className='row mt-auto pt-4'>
              <div className='col'>
                    <h5>
                      <div id='sub'>
                      Opening On  
                      </div> {formatDate(props.pollData.open_date)} {tConvert(props.pollData.open_time.substring(0,5))}</h5>
              </div>
              <div className='col' id='closing'>
                  <h5>
                    <div id="sub">
                    Closing On 
                    </div> {formatDate(props.pollData.close_date)} {tConvert(props.pollData.close_time.substring(0,5))}</h5>
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