import React from 'react';
import { Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function Closed() {
  return (
    <Card className="text-end text-white bg-dark" id='card'>
        <Card.Body>
        <div className="row align-items-center">
            <div className="col-4 "> 
                <h1>90%</h1>
                <p>
                of votes.
                </p>
            </div>
            <div className="col-8">
                <h5 className="card-title">Title of the Poll</h5>
                <hr/>
                <h4 className="card-text">Poll Option which opted more.</h4>
            </div>
        </div> 
            <Button class="btn btn-primary">See full report</Button>
        </Card.Body>
        <Card.Footer className="text-muted">
        Closed 2 days ago
        </Card.Footer>
    </Card>
   
  )
}

export default Closed