import React,{ useState, useEffect} from 'react'
import { Button, Row,Col, Container,Nav ,Sonnet, Tab} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import CreatePoll from '../CreatePoll/CreatePoll';

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () =>{
        setIsOpen(true)
      }
  return (
    <div className="Home">
        {isOpen&&
        <CreatePoll closeCreatePoll={setIsOpen} newPollData={(data)=> console.log(data)}/> }
        <div className="d-grid gap-2 col-6 mx-auto">
          <Button id="create" name='create' onClick={handleClick}>Create A Poll</Button>
        </div>
    </div>
  )
}

export default Home