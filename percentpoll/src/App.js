import React,{ useState, useEffect} from 'react'
import { Button,Tabs, Row,Col, Container,Nav ,Sonnet, Tab} from 'react-bootstrap';
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

  const [key, setKey] = useState('home');

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
      <Tabs
        id="tabContainer"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="justify-content-center mb-3 "
      >
        <Tab eventKey="home" title="Home" >
        <Home />
        </Tab>
        <Tab eventKey="upcoming" title="Upcoming Polls">
        <Upcoming />
        </Tab>
        <Tab eventKey="live" title="Live Polls" >
        <Live />
        <Live />
        <Live />
        <Live />
        <Live />
        <Live />
        <Live />
        <Live />
        </Tab>
        <Tab eventKey="closed" title="Closed Polls" >
        <Closed />
        </Tab>
      </Tabs>
      
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
