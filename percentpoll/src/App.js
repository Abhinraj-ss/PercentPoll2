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

      <Tab.Container id="left-tabs-example" defaultActiveKey="home">
        <Row>
          <Col sm={2} className='left-content'>
            <Nav variant="pills" className="flex-column gap-2">
              <Nav.Item>
                <Nav.Link eventKey="home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="upcoming">Upcoming Polls</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="live">Live Polls</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="closed">Closed Polls</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={8} className='right-content'>
            <Tab.Content>
              <Tab.Pane eventKey="home">
                <Home />
              </Tab.Pane>
              <Tab.Pane eventKey="upcoming">
                  <Upcoming />
              </Tab.Pane>
              <Tab.Pane eventKey="live">
                <Live />
                <Live />
                <Live />
                <Live />
                <Live />
                <Live />
              </Tab.Pane>
              <Tab.Pane eventKey="closed">
                <Closed />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      
      {isOpenLogin&&
      <LogIn closeLogin={()=>setIsOpenLogin(false)} loginData = {(hello)=>console.log(hello)
      }/>}
      {isOpenRegister&&
      <Register closeRegister={()=>setIsOpenRegister(false)} registerData={(hi)=>console.log(hi)}/>}
      
      
      {/*(typeof data.members === 'undefined')?(
        <p> Loading....</p>
      ): (
        data.members.map((member, i) => (
          <p key={i}> {member}</p>
        ))
        )*/}
     
    </div>
    </div>

  )
}

export default App