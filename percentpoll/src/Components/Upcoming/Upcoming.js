import React from 'react'
import { Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'




import './Upcoming.css'


function Upcoming() {
  return (
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
            <Button variant="flat">View poll</Button>
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
            <Button variant="flat">View poll</Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          Deadline: --/--/-- at --:--
        </Card.Footer>
    </Card>
    </div>
    </div>
  )
}

export default Upcoming