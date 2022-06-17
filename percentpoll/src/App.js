import React, { useState, useEffect} from "react";
import {
  Tabs,
  Tab,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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


  const getPolls = async() =>{
    var userData ={'user_id':userId}
    let res = await fetch(url+'/getPolls',{
      method : ['POST'],
      headers : {
        "Content-Type" : "application/json",
        "Accept":"application/json"
      },
      body : JSON.stringify(userData)
     
    });
    if(res.status === 200){
      console.log(res.json())
      console.log("no upcoming polls!!");
    }
       
    else if(res.status === 201){
      res = await res.json()
      setUpcomingPolls(res.upcoming)
      setLivePolls(res.live)
      setClosedPolls(res.closed)
      console.log("upcoming polls exists!!");
    }
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

        {/*(typeof data.members === 'undefined')?(
        <p> Loading....</p>
      ): (
        data.members.map((member, i) => (
          <p key={i}> {member}</p>
        ))
        )*/}
      </div>
    </div>
  );
}

export default App;
