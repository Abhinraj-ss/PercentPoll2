import React,{ useState} from 'react'
import { Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import CreatePoll from '../CreatePoll/CreatePoll';
import './Home.css'

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () =>{
        setIsOpen(true)
      }
  return (
    <div className="Home" >
        {isOpen&&
        <CreatePoll closeCreatePoll={setIsOpen} newPollData={(data)=> console.log(data)}/> }
        <p className='text-white' id='quote'>
        Life is 10 percent what you make it, and 90 percent how you take it.
        </p>
        
        <div className=" justify-center">
          <Button  id="create" name='create' onClick={handleClick} size="lg">Create A Poll</Button>
        </div>
    </div>
  )
}

export default Home