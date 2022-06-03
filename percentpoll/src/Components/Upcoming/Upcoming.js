import React ,{useState} from 'react'
import { Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


import './Upcoming.css'
import ViewPoll from './ViewPoll/ViewPoll';


function Upcoming() {
  const [show,setShow] = useState(false)

  const handleClickView = () =>{
      console.log(show)
      setShow(!show)
        
    }
  return (
    <>
    {show && <ViewPoll show={show} handleModalView={handleClickView}/>}
    <div className="row" id='card'>
      <div className="col">
    <Card className="text-start text-white bg-dark" id='card'>
        <Card.Body>
          <Card.Title>
            <h5 >Title of the Poll</h5>
          </Card.Title>
            <hr/>
            <Card.Text>
              <h6>This poll is scheduled to start on --/--/---</h6>

            </Card.Text>
            <Button variant="flat" onClick={handleClickView}>View poll</Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          Deadline: --/--/-- at --:--
        </Card.Footer>
    </Card>
    </div>
    <div className="col">
    <Card className="text-start text-white bg-dark" id='card'>
        <Card.Body>
          <Card.Title>
            <h5 >Title of the Poll</h5>
          </Card.Title>
            <hr/>
            <Card.Text>
              <h6>This poll is scheduled to start on --/--/---</h6>

            </Card.Text>
            <Button variant="flat" onClick={handleClickView}>View poll</Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          Deadline: --/--/-- at --:--
        </Card.Footer>
    </Card>
    </div>
    </div>
    </>
  )
}

export default Upcoming