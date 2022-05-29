import React from 'react'
import { Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'




import './Upcoming.css'


function Upcoming() {
  return (

    <Card className="text-start text-white bg-dark">
        <Card.Body>
          <Card.Title>
            <h5 >Title of the Poll</h5>
          </Card.Title>
            <hr/>
            <Card.Text>
              <h6>This poll is scheduled to start on --/--/---</h6>

            </Card.Text>
            <Button class="btn btn-primary">View poll</Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          Deadline: --/--/-- at --:--
        </Card.Footer>
    </Card>
    
  )
}

export default Upcoming