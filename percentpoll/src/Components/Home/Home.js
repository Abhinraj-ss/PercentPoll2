import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import CreatePoll from "../CreatePoll/CreatePoll";
import "./Home.css";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  //Life is 10 percent what you make it, and 90 percent how you take it.
  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <div className="Home col-10">
      {isOpen && <CreatePoll closeCreatePoll={setIsOpen} />}
      <p className="text-white" id="quote">
        Polls. Untangled.
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
