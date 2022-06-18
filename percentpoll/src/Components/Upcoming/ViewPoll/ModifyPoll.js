import React, { useState } from "react";
import {
  Modal,
  Button,
  Col,
  FormCheck,
  FormControl,
  CloseButton,
  FloatingLabel,
  FormLabel,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import axios from "axios"

import editIcon from "../../images/pencil_aqua.png"


function ModifyPoll({handleModalView, mPoll_id,closeModifyPoll,mTitle,mPollOptionList,mOpeningDate,mOpeningTime,mClosingDate,mClosingTime }) {
  const [pollOptionList, setPollOptionList] = useState(mPollOptionList);
  const [title, setTitle] = useState(mTitle);
  const [openingDate, setOpeningDate] = useState(mOpeningDate);
  const [closingDate, setClosingDate] = useState(mClosingDate);
  const [openingTime, setOpeningTime] = useState(mOpeningTime.substring(0,8));
  const [closingTime, setClosingTime] = useState(mClosingTime.substring(0,8));
  const [show, setShow] = useState(true);const [url,setUrl] = useState(()=>{
    
    if(process.env.NODE_ENV==='production'){
      return "https://percentpoll2.herokuapp.com" 
    } else if(process.env.NODE_ENV==='development')
      return "http://localhost:5000"
  } )
  const api = axios.create({
    baseURL: url
  })

  const handleClose = () => {
    setShow(false);
    closeModifyPoll(false);
  };
  console.log(title);
  console.log(pollOptionList);
  console.log(openingTime)

  const handleClickAdd = () => {
    setPollOptionList([...pollOptionList, { 'pollOption': "" }]);
  };

  const handleClickRemove = (index) => {
    const list = [...pollOptionList];
    list.splice(index, 1);
    setPollOptionList(list);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  const handlePollOptionChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...pollOptionList];
    list[index][name] = value;
    setPollOptionList(list);
  };
  const handleClickswitch  = () =>{
    console.log("switch checked")
    setOpeningDate(moment().format("YYYY-MM-DD")) 
    setOpeningTime(moment().format("HH:mm:ss"))
  }
  const handleSubmit = async () => {
   
    const pollData = {
      user_id: localStorage.getItem('user_id'),
      poll_id:mPoll_id,
      Title: title,
      pollOptions: pollOptionList,
      openingDate: openingDate,
      openingTime: openingTime,
      closingDate: closingDate,
      closingTime: closingTime,
    };
    console.log(pollData)
    await api.post('/modify',pollData).then(
      response => console.log(response)
    ).catch(function(error){
      console.log(error)
    }) 

    closeModifyPoll(false);
  };
  return (
    <>
    
      <Modal show={show} fullscreen={show} onHide={setShow} backdrop="static" keyboard={false}>
        <Modal.Header >
          <Modal.Title className="ms-3" >
          <img
                alt=""
                src={editIcon}
                width="25"
                height="25"
                className="d-inline-block me-2"
              />MODIFY POLL</Modal.Title>
          <CloseButton onClick={handleClose} className="btn-close-white" />
        </Modal.Header>
        <Modal.Body className="m-3">
          <div className="form-group">
            <div className="mb-4 ">
              <FloatingLabel controlId="floatingInputGrid" label="Title Text">
                <FormControl
                  required=""
                  placeholder="Enter title text"
                  type="text"
                  defaultValue={title}
                  onChange={(e) => {
                    handleTitleChange(e);
                  }}
                  autoFocus
                />
              </FloatingLabel>
            </div>
            <div className="row">
              <div className="col">
              <FormLabel className="form-label">Poll Options</FormLabel>
            {pollOptionList.map((singlePollOption, index) => (
              <div key={index} className="pollOptions">
                <div className="mb-4 row input-group">
                  <div id="pollOption">
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label={index+1}
                    >
                      <FormControl
                        required=""
                        placeholder="Poll Option"
                        name="pollOption"
                        type="text"
                        value={singlePollOption.pollOption}
                        onChange={(e) => {
                          handlePollOptionChange(e, index);
                        }}
                      />
                    </FloatingLabel>
                  </div>
                    {pollOptionList.length >= 3 && (
                      <Button   
                        id="removeBtn"     
                        variant="outline-danger"
                        onClick={() => {
                          handleClickRemove(index);
                        }}
                      >
                        X
                      </Button>
                    )}
                </div>
                <Col>
                  {pollOptionList.length - 1 === index && (
                    <div className=".col-auto mb-4  .me-auto" >
                      <Button
                        type="button"
                        variant="info"
                        onClick={handleClickAdd}
                      >
                        Add Poll Option
                      </Button>
                    </div>
                  )}
                </Col>
              </div>
            ))}
              </div>
              <div className="col">
              <div className="form-group">
              <FormLabel className="form-label me-3">Opens On </FormLabel>
              <FormCheck 
                type="switch"
                id="custom-switch"
                onChange={handleClickswitch}
                label="Open Now"
              />
              <FloatingLabel controlId="floatingInputGrid" label="Opening Date">
                <FormControl
                  required=""
                  type="date"
                  placeholder="Opening time"
                  value={openingDate}
                  onChange={(e) => setOpeningDate(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInputGrid" label="Opening Time">
                <FormControl
                  type="time"
                  defaultValue={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                />
              </FloatingLabel>
            </div>
            <div className="mb-3">
              <FormLabel className="form-label me-3">Closes On </FormLabel>
              <FloatingLabel controlId="floatingInputGrid" label="Closing Date">
                <FormControl
                  required=""
                  type="date"
                  defaultValue={closingDate}
                  placeholder="Closing Date"
                  onChange={(e) => setClosingDate(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInputGrid" label="ClosingTime">
                <FormControl
                  type="time"
                  defaultValue={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                />
              </FloatingLabel>
            </div>
            </div>
           </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <div className="d-grid col-3 mb-1" 
              id="createBtn">
            <Button
              type="submit"
              variant="success"
              className="btn-lg"
              onClick={()=>{handleModalView()
                handleSubmit()}}
            >
              Update
            </Button>
            
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModifyPoll;
