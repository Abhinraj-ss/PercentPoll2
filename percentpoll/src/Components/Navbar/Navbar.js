import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import navbarLogo from "../images/navbar.png";
import logoutLogo from "../images/logout_wyt.png";
import LogIn from "../LogIn/LogIn";
import Register from "../Register/Register";
import './Navbar.css'

function NavBar() {
  const [showLogIn,setShowLogIn]= useState(false)
  const[showRegister,setShowRegister]= useState(false)
  const[isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem('isLoggedIn'))


  const handleLoginModalOpen =()=>{
    setShowLogIn(!showLogIn)
    setIsLoggedIn(localStorage.getItem('isLoggedIn'))
  }

  const  handleRegisterModalOpen =() =>{
    setShowRegister(!showRegister)
  }
  setTimeout(()=>setIsLoggedIn(localStorage.getItem('isLoggedIn')),2000)
  return (
    <div id="navbar">
      {showLogIn&&<LogIn show={showLogIn} handleModalOpen={handleLoginModalOpen} handleRegisterModalOpen ={handleRegisterModalOpen}/>}
      {showRegister&&<Register show={showRegister} handleModalOpen={handleRegisterModalOpen} handleLoginModalOpen ={handleLoginModalOpen}/>}
        <Navbar
          collapseOnSelect
          expand="lg"
          sticky="top"
          variant="dark"
        >
          <Container>
            <Navbar.Brand href="/">
              <img
                alt=""
                src={navbarLogo}
                width="35"
                height="35"
                className="d-inline-block align-top me-2"
              />
              Percent Poll 2
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            
              <Nav className="ms-auto">
              {!isLoggedIn && 
              <>
                <Nav.Link onClick={handleLoginModalOpen} name="login">
                  LogIn
                </Nav.Link>
                <Nav.Link onClick={handleRegisterModalOpen} name="register">
                  Register
                </Nav.Link>
              </>
             
              }
              {isLoggedIn==='true' &&
                <Nav.Link eventKey={2} onClick={()=>{
                  localStorage.removeItem('isLoggedIn')
                  localStorage.removeItem('user_id')
                }} href='/' >LogOut
                  <img alt="" className="ms-2" src={logoutLogo} width="30" height="30" />
                </Nav.Link>
            }    
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
      </div>
  )
}

export default NavBar;
