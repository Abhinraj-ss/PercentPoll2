import React, { useState } from "react";
import {
  Modal,
  Alert,
  CloseButton,
  Button,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = async() =>{
    const userData = {
      name:name,
      email: email,
      password: password }
    const res = await fetch('/register',{
      method : ['POST'],
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(userData)
     
    });
    console.log(res)
    if(res.status === 200){
      console.log("Response Worked! but user exists already!!");
      setShow(true)
    }
      
    else if(res.status === 201){
      console.log("Response Worked! and user Added!!");
      props.handleModalOpen()
    }
  }
  const handleClickLogin =()=>{
    props.handleLoginModalOpen()
    props.handleModalOpen()
  }

  return (
      <Modal
        show={props.modalOpen}
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
          <div className="form-group">
            <FormLabel class="form-label">Name</FormLabel>
            <FormControl
              required=""
              placeholder="Enter name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              autoFocus
            />
            <FormLabel class="form-label">Email address</FormLabel>
            <FormControl
              required=""
              placeholder="Enter email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <FormLabel class="form-label">Password</FormLabel>
            <FormControl
              required=""
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FormLabel class="form-label">Confirm Password</FormLabel>
            <FormControl
              required=""
              placeholder="Password"
              type="password"
              value={cPassword}
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
            />
          </div>
          <div className="d-grid  mb-3 ">
            <Button
              type="submit"
              variant="success"
              size="lg"
              onClick={handleSubmit}
            >
              Create
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
          <h6>
            Already have an account?
            <Button variant="link" size="lg" onClick={handleClickLogin}>Login</Button>
          </h6>
        </Modal.Footer>
      </Modal>
  );
}

export default Register;
