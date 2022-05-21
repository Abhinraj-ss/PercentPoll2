import {React, useState} from 'react'
import { Modal,Button,Row, Col, FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import './CreatePoll.css'

function CreatePoll({closeCreatePoll}) {
  const [opening, setOpening] = useState(new Date());
  const [closing, setClosing] = useState(new Date());
  const [pollOptionList, setPollOptionList] = useState([{pollOption:""},{pollOption:""}]);
  const [title, setTitle] = useState("")


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(pollOptionList);

  const handleClickAdd =() => {
    setPollOptionList([...pollOptionList,{pollOption:""}]);
  }

  const handleClickRemove =(index) => {
    const list = [...pollOptionList];
    list.splice(index,1);
    setPollOptionList(list)
  }

  const handleTitleChange= (e) =>{
    const newTitle = e.target.value;
    setTitle(newTitle);
  }

  const handlePollOptionChange =(e, index) => {
    const {name, value} = e.target;
    const list = [...pollOptionList];
    list[index][name] = value;
    setPollOptionList(list);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
  </Button>

      <Modal
        show={show}
        onHide={setShow}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title h4>CREATE POLL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form class="">
          <div class="mb-4 form-group">
            <label class="form-label">Title Text</label>
            <input required="" placeholder="Enter title text" type="text" class="form-control" value={title} onChange={(e)=>{handleTitleChange(e)}}/>
          </div>
          {pollOptionList.map((singlePollOption,index) => (
            <div key={index} className = "pollOptions">
              <div className="mb-4 row form-group">
               
                <label className="form-label">Poll Option</label>
                  <div className="col-md-9">
                  <input required="" placeholder="Poll Option" name = "pollOption" type="text" class="form-control" value={singlePollOption.pollOption} onChange={(e) =>{handlePollOptionChange(e,index)}} />

                  </div>
                <Col col-auto>
                    {pollOptionList.length  >= 2 && (
                      <button type="button" class="btn btn-primary btn-danger" onClick={()=>{handleClickRemove(index)}}>Remove</button>
                    
                  )}
                </Col>
              </div>
                <Col>
                  {pollOptionList.length - 1 === index && (
                    <div className='.col-auto mb-4  .me-auto'>
                      <button type="button" class="btn btn-primary" onClick={handleClickAdd}>Add Poll Option</button>
                    </div>
                  )}
                </Col>
              </div>
          ))}
            <div class="mb-4  form-group"><label class="form-label me-3">Opens on </label>
            <FormControl  required="" type ='date'className="date" placeholder="Opening time" />
            <FormControl type='time'/>
            </div>
            <div class="mb-4 form-group"><label class="form-label me-3">Closes on  </label>
            <FormControl  required="" type ='date'className="date" placeholder="Closing time" />
            <FormControl type='time'/>            
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-grid gap-2 col-10 mx-auto mb-4">
            <button type="button" class="btn btn-primary btn-lg" onClick={()=>{closeCreatePoll(false)}}>Create</button>
          </div>
        </Modal.Footer>
      </Modal>
    </>)
}

export default CreatePoll