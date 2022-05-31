import React, { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import navbarLogo from "./navbar.png";
import logoutLogo from "./logout_wyt.png";
import LogIn from "../LogIn/LogIn";
import Register from "../Register/Register";
import './Navbar.css'

class NavBar extends Component {
  state = {
    logInModal: false,
    registerModal: false,
  };

  handleLoginModalOpen = () => {
    this.setState((prevState) => {
      return {
        logInModal: !prevState.logInModal,
      };
    });
  };

  handleRegisterModalOpen = () => {
    this.setState((prevState) => {
      return {
        registerModal: !prevState.registerModal,
      };
    });
  };
  render() {
    return (
      <div id="navbar">
        <Navbar
          collapseOnSelect
          expand="lg"
          sticky="top"
          bg="dark"
          variant="dark"
        >
          <Container>
            <Navbar.Brand href="/">
              <img
                alt=""
                src={navbarLogo}
                width="35"
                height="35"
                className="d-inline-block align-top"
              />
              {"        "}
              Percent Poll 2
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {/*<Nav className="me-auto">
        <Nav.Link href="/upcoming">Upcoming Polls</Nav.Link>
        <Nav.Link href="/live">Live Polls</Nav.Link>
        <Nav.Link href='/closed'>Closed Polls</Nav.Link>
  </Nav>*/}
              <Nav className="ms-auto">
                <Nav.Link onClick={this.handleLoginModalOpen} name="login">
                  LogIn
                </Nav.Link>
                <Nav.Link
                  onClick={this.handleRegisterModalOpen}
                  name="register"
                >
                  Register
                </Nav.Link>
                <Nav.Link eventKey={2} href="/">
                  <img alt="" src={logoutLogo} width="25" height="25" />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <LogIn
          modalOpen={this.state.logInModal}
          handleModalOpen={this.handleLoginModalOpen}
        />
        <Register
          modalOpen={this.state.registerModal}
          handleModalOpen={this.handleRegisterModalOpen}
        />
      </div>
    );
  }
}

export default NavBar;
