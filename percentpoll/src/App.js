import React, { useState, useEffect, useContext} from "react";
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
import {userContext} from './Components/Contexts/userContext'
import noPolls from './Components/images/NoPolls.png'


function App() {
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [key, setKey] = useState("home");
  const [data, setData] = useState({isLoggedIn:false,email:"",password:""});
  const userId =localStorage.getItem('user_id')
  const [upcomingPolls,setUpcomingPolls ]= useState([{}])
  const [livePolls,setLivePolls ]= useState([{}])
  const [closedPolls,setClosedPolls ]= useState([{}])
  const modalClosing =localStorage.getItem('modal_closing')

  const getPolls = async() =>{
    var userData ={'user_id':userId}
    let res = await fetch('/getPolls',{
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
  },[modalClosing]);
  console.log(upcomingPolls,livePolls,closedPolls )
  return (
    <div className="App" >
      <userContext.Provider value={{data,setData}}>
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
            <Upcoming noPolls = {noPolls} upcomingPolls={upcomingPolls}/>
          </Tab>
          <Tab eventKey="live" title="Live Polls">
            <Live noPolls = {noPolls} livePolls={livePolls}/>
          </Tab>
          <Tab eventKey="closed" title="Closed Polls">
            <Closed noPolls = {noPolls} closedPolls={closedPolls}/>

          </Tab>
        </Tabs>

        {isOpenLogin && (
          <LogIn
            closeLogin={() => setIsOpenLogin(false)}
            loginData={(hello) => console.log(hello)}
          />
        )}
        {isOpenRegister && (
          <Register
            closeRegister={() => setIsOpenRegister(false)}
            registerData={(hi) => console.log(hi)}
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
      </userContext.Provider>
    </div>
  );
}

export default App;
