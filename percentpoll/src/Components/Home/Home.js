import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import CreatePoll from "../CreatePoll/CreatePoll";
import "./Home.css";
import createIcon from '../images/create.png'
import LogIn from "../LogIn/LogIn";
import Register from "../Register/Register";

function Home() {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [showLogin ,setShowlogIn] = useState(false)
  const[showRegister,setShowRegister]= useState(false)


  const  handleRegisterModalOpen =() =>{
    setShowRegister(!showRegister)
  }

  const handleClick = () => {
    if(localStorage.getItem('isLoggedIn')==='true')
      {setIsOpenCreate(true);
      setShowlogIn(false)}
    else{
      setShowlogIn(!showLogin)
    }
  };
  return (
    <div className="Home col-10 ">
      {showLogin && <LogIn show={showLogin} handleModalOpen={handleClick} handleRegisterModalOpen ={handleRegisterModalOpen}/>}
      {showRegister&&<Register show={showRegister} handleModalOpen={handleRegisterModalOpen} handleLoginModalOpen ={handleClick}/>}
      {isOpenCreate && <CreatePoll closeCreatePoll={setIsOpenCreate} />}
      <p className="text-white" id="quote">
        Polls. Untangled.
      </p>
      <div className=" d-grid d-md-block .mx-auto">
        <Button
          variant="flat"
          id="create"
          name="create"
          onClick={handleClick}
          size="lg"
        >
          <img
                alt=""
                src={createIcon}
                width="25"
                height="25"
                className="d-inline-block me-2 mb-1"
              />
          Create a poll
        </Button>
      </div>
    </div>
  );
}

export default Home;
