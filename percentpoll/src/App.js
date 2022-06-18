import React, { useState, useEffect} from "react";
import {
  Tabs,
  Tab,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'

import LogIn from "./Components/LogIn/LogIn";
import Register from "./Components/Register/Register";
import Upcoming from "./Components/Upcoming/Upcoming";
import Live from "./Components/Live/Live";
import Closed from "./Components/Closed/Closed";
import "./App.css";
import NavBar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import noPolls from './Components/images/NoPolls.png' 


function App() {
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [key, setKey] = useState("home");
  const userId =localStorage.getItem('user_id')
  const [upcomingPolls,setUpcomingPolls ]= useState([{}])
  const [livePolls,setLivePolls ]= useState([{}])
  const [closedPolls,setClosedPolls ]= useState([{}])
  const [url,setUrl] = useState(()=>{
    
    if(process.env.NODE_ENV==='production'){
      return "https://percentpoll2.herokuapp.com" 
    } else if(process.env.NODE_ENV==='development')
      return "http://localhost:5000"
  } )
  const api = axios.create({
    baseURL: url
  })
  const getPolls=async()=>{
    await api.post('/getPolls',{user_id:userId})
    .then(function (response) {
      console.log(response);
      if(response.status === 200){
        console.log(response.json())
        console.log("no upcoming polls!!");
      }
         
      else if(response.status === 201){
        setUpcomingPolls(response.data.upcoming)
        setLivePolls(response.data.live)
        setClosedPolls(response.data.closed)
        console.log("upcoming polls exists!!");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    console.log(userId)
    getPolls()
  console.log(upcomingPolls,livePolls,closedPolls )
  },[isOpenLogin]);
  return (
    <div className="App" >
      <NavBar />
      <div className="body">
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="justify-content-center mb-4 "
        >
          <Tab eventKey="home" title="Home">
            <Home/>
          </Tab>
          <Tab eventKey="upcoming" title="Upcoming Polls">
            <Upcoming noPolls={noPolls} upcomingPolls={upcomingPolls}/>
          </Tab>
          <Tab eventKey="live" title="Live Polls">
            <Live noPolls={noPolls} livePolls={livePolls}/>
          </Tab>
          <Tab eventKey="closed" title="Closed Polls">
            <Closed noPolls={noPolls} isOpenLogin={isOpenLogin} closedPolls={closedPolls}/>

          </Tab>
        </Tabs>

        {isOpenLogin && (
          <LogIn
            closeLogin={() => {
              setIsOpenLogin(false)}}
          />
        )}
        {isOpenRegister && (
          <Register
            closeRegister={() => setIsOpenRegister(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
