import React, { useState } from "react";
import {
  Modal,
  FormGroup,
  Form,
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

  //const data = ({email: email, password: password, cPassword:cPassword })

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
              onClick={props.handleModalOpen}
            >
              Create
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
          <h6>
            Already have an account?
            <a href="/login">Login</a>
          </h6>
        </Modal.Footer>
      </Modal>
  );
}

export default Register;
