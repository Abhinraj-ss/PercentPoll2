import React from 'react';
import { Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import './Closed.css'

function Closed() {
  return (
      <div className="row" id='card'>
          <div className="col">
    <Card className=" text-white bg-dark" id='card'>
        <Card.Body>
        <div className="row ">
            <div className="col-4 "> 
                <div id='percentVotes'>90%</div>
                <p>
                of votes.
                </p>
            </div>
            <div className="col-8 text-end">
                <h5 className="card-title">Title of the Poll</h5>
                <hr/>
                <h4 className="card-text">Poll Option which opted more.</h4>
            </div>
        </div> 
            <Button variant="flat">See full report</Button>
        </Card.Body>
        <Card.Footer className="text-muted">
        Closed 2 days ago
        </Card.Footer>
    </Card>
    </div>
    <div className="col">
    <Card className=" text-white bg-dark" id='card'>
        <Card.Body>
        <div className="row ">
            <div className="col-4 "> 
                <div id='percentVotes'>90%</div>
                <p>
                of votes.
                </p>
            </div>
            <div className="col-8 text-end">
                <h5 className="card-title">Title of the Poll</h5>
                <hr/>
                <h4 className="card-text">Poll Option which opted more.</h4>
            </div>
        </div> 
            <Button variant="flat">See full report</Button>
        </Card.Body>
        <Card.Footer className="text-muted">
        Closed 2 days ago
        </Card.Footer>
    </Card>
    </div>
    </div>
   
  )
}

export default Closed