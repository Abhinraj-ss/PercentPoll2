import React, { useState,useEffect } from "react";
import {
  Modal,
  Button,
  Col,
  FormCheck,
  FormControl,
  CloseButton,
  FloatingLabel,
  FormLabel,
  FormGroup,
  Form
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import axios from 'axios'

import "./CreatePoll.css";
import createIcon from "../images/create.png"
import loadingIcon from '../images/loading.png'

function CreatePoll({ closeCreatePoll,mTitle,mPollOptionList,mOpeningDate,mOpeningTime,mClosingDate,mClosingTime }) {
  const [pollOptionList, setPollOptionList] = useState([
    { 'pollOption': "" },
    { 'pollOption': "" },
  ]);
  const [title, setTitle] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [validated, setValidated] = useState(false);
  const [submit,setSubmit] = useState(false)
  const [url,setUrl] = useState(()=>{
    
    if(process.env.NODE_ENV==='production'){
      return "https://percentpoll2.herokuapp.com" 
    } else if(process.env.NODE_ENV==='development')
      return "http://localhost:5000"
  } )

  const api =axios.create({
    baseURL:url
  })
  console.log(title)
  useEffect(() => {
  if (mTitle){
    setTitle(mTitle)
    setPollOptionList(mPollOptionList)
    setOpeningDate(mOpeningDate)
    setOpeningTime(mOpeningTime)
    setClosingDate(mClosingDate)
    setClosingTime(mClosingTime)
    console.log(title)

  }
  }, [])
   
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    closeCreatePoll(false);
  };
  console.log(title);
  console.log(pollOptionList);

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
    setSubmit(true)
    const pollData = {
      user_id: localStorage.getItem('user_id'),
      Title: title,
      pollOptions: pollOptionList,
      openingDate: openingDate,
      openingTime: openingTime,
      closingDate: closingDate,
      closingTime: closingTime,
    };
    console.log('createpoll open aayi')

    await api.post('/createPoll',pollData).then(
      response => console.log(response)
    ).catch(function(error){
      console.log(error)
    })  
    closeCreatePoll(false);
  };


  const handleValidate =(event) =>{
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else{
      event.preventDefault();
      event.stopPropagation();
      handleSubmit()
    }
    setValidated(true);
  }
  return (
    <>
      <Modal show={show} fullscreen={show} onHide={setShow} backdrop="static" keyboard={false}>
        <Modal.Header >
          <Modal.Title className="ms-3" ><img
                alt=""
                src={createIcon}
                width="35"
                height="35"
                className="d-inline-block me-2"
              />CREATE POLL</Modal.Title>
          <CloseButton onClick={handleClose} className="btn-close-white" />
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleValidate}>
        <Modal.Body className="m-3">
            <div className="mb-4 ">
              <FormGroup>
                <FloatingLabel controlId="floatingInputGrid" label="Title Text">
                  <FormControl
                    placeholder="Enter title text"
                    type="text"
                    defaultValue={title}
                    onChange={(e) => {
                      handleTitleChange(e);
                    }}
                    autoFocus
                    required
                  />
                <Form.Control.Feedback type="invalid">
                Title is a required field.
              </Form.Control.Feedback>
                </FloatingLabel>
              </FormGroup>
              
            </div>
            <div className="row">
              <div className="col">
              <FormLabel className="form-label">Poll Options</FormLabel>
            {pollOptionList.map((singlePollOption, index) => (
              <div key={index} className="pollOptions">
                <div className="mb-1 row input-group">
                  <div id="pollOption">
                  <FloatingLabel id="floatingCreate"
                      controlId="floatingInputGrid"
                      label={index+1}>
                        <FormControl
                        placeholder="Poll Option"
                        name="pollOption"
                        type="text"
                        value={singlePollOption.pollOption}
                        onChange={(e) => {
                          handlePollOptionChange(e, index);
                        }}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Poll option is a required field.
                      </Form.Control.Feedback>
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
              <FormGroup>
              <FormLabel className="form-label me-3">Opens On </FormLabel>
              <FormCheck 
                type="switch"
                id="custom-switch"
                onChange={handleClickswitch}
                label="Open Now"
              />
              </FormGroup>
              <FormGroup>
              <FloatingLabel controlId="floatingInputGrid" label="Opening Date">
                <FormControl
                  type="date"
                  placeholder="Opening time"
                  value={openingDate}
                  onChange={(e) => setOpeningDate(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                Opening date is a required field.
              </Form.Control.Feedback>
              </FloatingLabel>
              </FormGroup>
              <FormGroup>
              <FloatingLabel controlId="floatingInputGrid" label="Opening Time">
                <FormControl
                  type="time"
                  defaultValue={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                Opening time is a required field.
              </Form.Control.Feedback>
              </FloatingLabel>
              </FormGroup>
              
            <div className="mb-3">
              <FormGroup>
              <FormLabel className="form-label me-3">Closes On </FormLabel>
              <FloatingLabel controlId="floatingInputGrid" label="Closing Date">
                <FormControl
                  type="date"
                  defaultValue={closingDate}
                  placeholder="Closing Date"
                  onChange={(e) => setClosingDate(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                Closing date is a required field.
              </Form.Control.Feedback>
              </FloatingLabel>
              </FormGroup>
              <FormGroup>
              <FloatingLabel controlId="floatingInputGrid" label="ClosingTime">
                <FormControl
                  type="time"
                  defaultValue={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                Closing time is a required field.
              </Form.Control.Feedback>
              </FloatingLabel>
              </FormGroup>
              
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
            > {
              submit &&
              <img
              alt="loading"
              src={loadingIcon}
              id="loadingIcon"
              className="d-inline-block"
            />
            }
              Create
            </Button>
            
          </div>
        </Modal.Footer>

        </Form>
      </Modal>
    </>
  );
}

export default CreatePoll;
