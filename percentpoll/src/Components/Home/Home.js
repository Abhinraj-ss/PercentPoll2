import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import CreatePoll from "../CreatePoll/CreatePoll";
import "./Home.css";
import {userContext} from '../Contexts/userContext'
import createIcon from "../images/create.png"

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const {data}= useContext(userContext)

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
                className="d-inline-block"
              />
          Create a poll
        </Button>
      </div>
    </div>
  );
}

export default Home;
