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
    isLoggedIn:localStorage.getItem('isLoggedIn')
  };

  handleLoginModalOpen = () => {
    this.setState((prevState) => {
      return {
        logInModal: !prevState.logInModal,
        isLoggedIn:localStorage.getItem('isLoggedIn')
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
            
              <Nav className="ms-auto">
              {!this.state.isLoggedIn && 
              <>
                <Nav.Link onClick={this.handleLoginModalOpen} name="login">
                  LogIn
                </Nav.Link>
                <Nav.Link onClick={this.handleRegisterModalOpen} name="register">
                  Register
                </Nav.Link>
              </>
             
              }
              {this.state.isLoggedIn==='true' &&
                <Nav.Link eventKey={2} onClick={()=>{
                  localStorage.removeItem('isLoggedIn')
                  localStorage.removeItem('user_id')
                }} href='/' >
                  <img alt="" src={logoutLogo} width="25" height="25" />
                </Nav.Link>
            }    
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <LogIn
          modalOpen={this.state.logInModal}
          handleModalOpen={this.handleLoginModalOpen}
          handleRegisterModalOpen ={this.handleRegisterModalOpen}
        />
        <Register
          modalOpen={this.state.registerModal}
          handleModalOpen={this.handleRegisterModalOpen}
          handleLoginModalOpen ={this.handleLoginModalOpen}
        />
      </div>
    );
  }
}

export default NavBar;
