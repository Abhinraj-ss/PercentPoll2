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


  const getPolls = async() =>{
    var userData ={'user_id':userId}
    let res = await fetch('/upcoming',{
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
      setUpcomingPolls(res)
      console.log(res,upcomingPolls )
      console.log("upcoming polls exists!!");
    }
    
  }
  useEffect(() => {
    console.log(userId)
    getPolls()
  },[]);

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
            <Live noPolls = {noPolls}/>
          </Tab>
          <Tab eventKey="closed" title="Closed Polls">
            <Closed noPolls = {noPolls} />

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
