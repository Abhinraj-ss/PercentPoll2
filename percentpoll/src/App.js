import React, { useState, useEffect ,useContext} from "react";
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

function App() {
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [key, setKey] = useState("home");
  const [data, setData] = useState([{}]);
  useEffect(() => {
    fetch("/members")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

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
            <Home />
          </Tab>
          <Tab eventKey="upcoming" title="Upcoming Polls">
            <Upcoming />
          </Tab>
          <Tab eventKey="live" title="Live Polls">
            <Live />
            <Live />
            <Live />
            <Live />
            <Live />
            <Live />
            <Live />
            <Live />
          </Tab>
          <Tab eventKey="closed" title="Closed Polls">
            <Closed />
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
    </div>
  );
}

export default App;
