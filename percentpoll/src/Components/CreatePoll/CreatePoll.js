import React, {useState} from 'react'
import { Modal,Button,Row, Col, FormControl, CloseButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import './CreatePoll.css'

function CreatePoll({closeCreatePoll , newPollData}) {
  const [pollOptionList, setPollOptionList] = useState([{pollOption:""},{pollOption:""}]);
  const [title, setTitle] = useState("")
  const [openingDate,setOpeningDate] = useState("")
  const [closingDate,setClosingDate] = useState("")
  const [openingTime,setOpeningTime] = useState("")
  const [closingTime,setClosingTime] = useState("")


  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false)
    closeCreatePoll(false)
  };

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

  const addNewPoll = async()=>{
    /*newPollData({
      "Title":title,
      "pollOptions": pollOptionList,
      "openingDate": openingDate,
      "openingTime": openingTime,
      "closingDate": closingDate,
      "closingTime": closingTime
    })*/
    const pollData = {
      "Title":title,
      "pollOptions": pollOptionList,
      "openingDate": openingDate,
      "openingTime": openingTime,
      "closingDate": closingDate,
      "closingTime": closingTime
    }
    const res = await fetch("/newpoll", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(pollData)
    })
    if (res.ok){
      console.log("response worked")
    }
    closeCreatePoll(false)}
  return (
    <>
      <Modal show={show} onHide={setShow} backdrop="static" keyboard={false}>
        <Modal.Header >
          <Modal.Title h4>CREATE POLL</Modal.Title>
          <CloseButton onClick={handleClose}/>
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
            <FormControl  required="" type ='date'className="date" placeholder="Opening time" onChange={(e)=>setOpeningDate(e.target.value)} />
            <FormControl type='time'onChange={(e)=>setOpeningTime(e.target.value)}/>
            </div>
            <div class="mb-4 form-group"><label class="form-label me-3">Closes on  </label>
            <FormControl  required="" type ='date'className="date" placeholder="Closing time" onChange={(e)=>setClosingDate(e.target.value)} />
            <FormControl type='time' onChange={(e)=>setClosingTime(e.target.value)}/>            
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-grid gap-2 col-10 mx-auto mb-4">
            <button type="submit" class="btn btn-primary btn-lg" onClick={addNewPoll}>Create</button>
          </div>
        </Modal.Footer>
      </Modal>
    </>)
}

export default CreatePoll