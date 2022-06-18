import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import CreatePoll from "../CreatePoll/CreatePoll";
import "./Home.css";
import createIcon from '../images/create.png'

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <div className="Home col-10">
     
      {isOpen && <CreatePoll closeCreatePoll={setIsOpen} />}
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
