import React, { useState } from "react";
import {
  Modal,
  Alert,
  CloseButton,
  Button,
  FormControl,
  FormLabel,
  Form,
  FormGroup
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import loadingIcon from '../images/loading.png'

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [submit,setSubmit] = useState(false)
  const [url,setUrl] = useState(()=>{
    
    if(process.env.NODE_ENV==='production'){
      return "https://percentpoll2.herokuapp.com" 
    } else if(process.env.NODE_ENV==='development')
      return "http://localhost:5000"
  } )

  const handleSubmit = async() =>{
    setSubmit(true)
    const userData = {
      name:name,
      email: email,
      password: password }
    const res = await fetch(url+'/register',{
      method : ['POST'],
      headers : {
        "Content-Type" : "application/json",
        "Accept":"application/json"
      },
      body : JSON.stringify(userData)
     
    });
    console.log(res)
    if(res.status === 200){
      console.log("Response Worked! but user exists already!!");
      setShow(true)
      setSubmit(false)
    }
      
    else if(res.status === 201){
      console.log("Response Worked! and user Added!!");
      props.handleModalOpen()
    }
  }

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


  const handleClickLogin =()=>{
    props.handleLoginModalOpen()
    props.handleModalOpen()
  }

  return (
      <Modal
        show={props.show}
        onHide={props.handleModalOpen}
        centered="true"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title h4>REGISTER</Modal.Title>
          <CloseButton
            name="closeRegister"
            className="btn-close-white"
            onClick={props.handleModalOpen}
          />
        </Modal.Header>
        <Modal.Body>
        <Alert variant="danger"  show={show} onClose={() => setShow(false)} dismissible>
        <h6>Email address already registered!</h6>
        </Alert>
        <Form noValidate validated={validated} onSubmit={handleValidate}>
          <FormGroup>
            <FormLabel >Name</FormLabel>
              <FormControl
                placeholder="Enter name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoFocus
                required 
              />
              <Form.Control.Feedback type="invalid">
                Name is a required field.
              </Form.Control.Feedback>
            </FormGroup>
          <FormGroup>
            <FormLabel >Email address</FormLabel>
              <FormControl
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required 
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
          </FormGroup>
          <FormGroup>
            <FormLabel >Password</FormLabel>
            <FormControl
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required 
            />
             <Form.Control.Feedback type="invalid">
                Password is a required field.
              </Form.Control.Feedback>
          </FormGroup>
          <FormGroup>
            <FormLabel >Confirm Password</FormLabel>
              <FormControl
                placeholder="Password"
                type="password"
                value={cPassword}
                onChange={(e) => {
                  setCPassword(e.target.value);
                }}
                required 
              />
              {cPassword!==password &&
                <Form.Control.Feedback type="invalid">
                Passwords does not match.
                </Form.Control.Feedback>
              }
          </FormGroup>
            
          <div className="d-grid  mb-3 mt-4">
            <Button
              type="submit"
              variant="success"
              size="lg"
            > {
              submit &&
              <img
              alt="loading"
              src={loadingIcon}
              id="loadingIcon"
              className="d-inline-block"
            />
            }
              Register
            </Button>
          </div>
        </Form>
          
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
          <h6>
            Already have an account?
            </h6>

            <Button variant="link" size="lg" id="btnLogin" onClick={handleClickLogin}>Login</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default Register;
