import React from 'react'
import { Container,Nav,Navbar} from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{"        "}
        Percent Poll
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      {/*<Nav className="me-auto">
        <Nav.Link href="/upcoming">Upcoming Polls</Nav.Link>
        <Nav.Link href="/live">Live Polls</Nav.Link>
        <Nav.Link href='/closed'>Closed Polls</Nav.Link>
  </Nav>*/}
      <Nav className='ms-auto'>
        <Nav.Link href="#deets">LogIn</Nav.Link>
        <Nav.Link eventKey={2} href="/Register">
          Register
        </Nav.Link>
        <Nav.Link eventKey={3} href="#memes">
          Logout
        </Nav.Link>
       
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar
