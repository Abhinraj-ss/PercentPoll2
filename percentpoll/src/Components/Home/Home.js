import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import CreatePoll from "../CreatePoll/CreatePoll";
import "./Home.css";
import {userContext} from '../Contexts/userContext'

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const {data}= useContext(userContext)
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const user_id = localStorage.getItem('user_id')

  const handleClick = () => {
    console.log(data)
    setIsOpen(true);
  };
  return (
    <div className="Home col-10">
     
      {isOpen && <CreatePoll closeCreatePoll={setIsOpen} />}
      <p className="text-white" id="quote">
        Polls. Untangled.
        {data["email"]}
      </p>
      <div className=" justify-center">
        <Button
          variant="flat"
          id="create"
          name="create"
          onClick={handleClick}
          size="lg"
        >
          Create Poll
        </Button>
      </div>
    </div>
  );
}

export default Home;
