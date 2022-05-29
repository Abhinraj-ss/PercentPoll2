import React,{ useState, useEffect} from 'react'
import { Button, Row,Col, Container,Nav ,Sonnet, Tab} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'


import LogIn from './Components/LogIn/LogIn';
import CreatePoll from './Components/CreatePoll/CreatePoll'
import Register from './Components/Register/Register';
import Upcoming from './Components/Upcoming/Upcoming';
import Live from './Components/Live/Live';
import Closed from './Components/Closed/Closed';
import LiveReport from './Components/Live/LiveReport/LiveReport';
import ClosedReport from './Components/Closed/ClosedReport/ClosedReport';
import './App.css';
import ViewPoll from './Components/Upcoming/ViewPoll/ViewPoll';
import NavBar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';


function App() {
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);


  const[ data, setData] = useState([{}])
  useEffect (() => {
      fetch("/members").then(
        res => res.json()
      ).then(
        data =>{
          setData(data)
          console.log(data)
        }
      )
    },[]
  )


 

  return (
    <div className='App'>
      <NavBar/>

      <div className="mainContainer">

      <Container>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Upcoming Polls</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Live Polls</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Closed Polls</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <div className="vr"/>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Home />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <div className="d-grid gap-2 col-10 mx-auto">
                  <Upcoming />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <Live />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <Closed />
              </Tab.Pane>

            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      </Container>
      
      {isOpenLogin&&
      <LogIn closeLogin={()=>setIsOpenLogin(false)} loginData = {(hello)=>console.log(hello)
      }/>}
      {isOpenRegister&&
      <Register closeRegister={()=>setIsOpenRegister(false)} registerData={(hi)=>console.log(hi)}/>}
      
      
      {(typeof data.members === 'undefined')?(
        <p> Loading....</p>
      ): (
        data.members.map((member, i) => (
          <p key={i}> {member}</p>
        ))
        )}
    </div>
    </div>

  )
}

export default App