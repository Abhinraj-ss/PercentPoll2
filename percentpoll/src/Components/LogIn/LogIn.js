import React, { useState,useRef } from "react";
import {
  Button,
  Modal,
  CloseButton,
  Alert,
  Form,
  FormLabel,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LogIn.css";
import loadingIcon from "../images/loading.png";
import {FaRegClipboard, FaCheck} from 'react-icons/fa'

function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [validated, setValidated] = useState(false);
  const urlRef = useRef(null);
  const [copyUser,setCopyUser] = useState(true)
  const [copyPass,setCopyPass] = useState(true)
  const [url, setUrl] = useState(() => {
    if (process.env.NODE_ENV === "production") {
      return "https://percentpoll2.herokuapp.com";
    } else if (process.env.NODE_ENV === "development")
      return "http://localhost:5000";
  });
  const demoUser = "abc@g"
  const demoPass = "abc"
  console.log(email, password);

  const handleSubmit = async () => {
    setSubmit(true);
    var userData = {
      email: email,
      password: password,
    };
    let res = await fetch(url + "/login", {
      method: ["POST"],
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (res.status === 200) {
      console.log(res.json());
      console.log("Response Worked! but user does not exists!!");
      setShow(true);
      setSubmit(false);
    } else if (res.status === 201) {
      res = await res.json();
      console.log(res);
      console.log("Response Worked! and user exists!!");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user_id", JSON.stringify(res["user_id"]));
      props.handleModalOpen();
    }
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

  const handleClickRegister = () => {
    props.handleRegisterModalOpen();
    props.handleModalOpen();
  };
  function copyToClipboard(copyText) {
    navigator.clipboard.writeText(copyText)
  };
  return (
    <>
      
      <Modal
        show={props.show}
        onHide={props.handleModalOpen}
        centered="true"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>LOG IN</Modal.Title>
          <CloseButton
            onClick={props.handleModalOpen}
            className="btn-close-white"
            name="closeLogin"
          />
        </Modal.Header>
        <Modal.Body>
          <Alert
            variant="danger"
            show={show}
            onClose={() => setShow(false)}
            dismissible
          >
            <h6>User does not exists!</h6>
          </Alert>
          <p> For demo purpose, Use the following credentials.</p>
          <div className="row">
        
      {
        navigator.clipboard &&
        <>
        <div className="d-flex mx-1">
        <Form   className='col-11'>
        <FormControl
          ref={urlRef}
          value={"Email Adress: "+demoUser}
          style={{color:"black"}}
          readOnly
        />

      </Form>
      <Button onClick={()=>{copyToClipboard(demoUser)
                            setCopyUser(false)}} variant='success' className=' col-3 btnCopy'>
      {copyUser ? <FaRegClipboard/>: <FaCheck/>}
      </Button>  
        </div>
        <div className="d-flex mx-1">
        <Form   className='col-11'>
        <FormControl
          ref={urlRef}
          value={"Password: "+demoPass}
          style={{color:"black"}}
          readOnly
        />

      </Form>
      <Button onClick={()=>{copyToClipboard(demoPass)
                            setCopyPass(false)}} variant='success' className=' col-3 btnCopy'>
      {copyPass ? <FaRegClipboard/>: <FaCheck/>}
      </Button>  
        </div>
        </>
        
      }
      
    </div>
          <Form noValidate validated={validated} onSubmit={handleValidate}>
            <FormGroup >
              <FormLabel>Email address</FormLabel>
              <FormControl
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoFocus
                required 
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Password</FormLabel>
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
            
            <div className="d-grid  mb-3 mt-4" >
              <Button
                type="submit"
                variant="success"
                size="lg"
              >
                {submit && (
                  <img
                    alt="loading"
                    src={loadingIcon}
                    id="loadingIcon"
                    className="d-inline-block"
                  />
                )}
                Login
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
          <h6>Don't have an account?</h6>
          <Button
            variant="link"
            size="lg"
            id="btnRegister"
            onClick={handleClickRegister}
          >
            Create one
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogIn;
