import React from 'react'
import { Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Live.css'

function Live() {
  return (
    <div className="row">
      <div className="col">
    <Card className="text-center text-white bg-dark" id="card">
        <Card.Body>
          <Card.Title>
            <h5 >Title of the Poll</h5>
          </Card.Title>
          {/*<div class="progress">
            <div class="progress-bar bg-success" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="progress">
            <div class="progress-bar bg-info" role="progressbar"  aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="progress">
            <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="progress">
            <div class="progress-bar bg-danger" role="progressbar"  aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>*/}
            <hr/>
            <Card.Text>
              <h6>With supporting text below as a natural lead-in to additional content.</h6>

            </Card.Text>
            <Button class="btn btn-primary">See live report</Button>
        </Card.Body>
        <Card.Footer className="text-muted">
        Deadline: --/--/-- at --:-- OR a timer can be implimented.
        </Card.Footer>
    </Card>
    </div>
    <div className="col">
    <Card className="text-center text-white bg-dark" id="card">
        <Card.Body>
          <Card.Title>
            <h5 >Title of the Poll</h5>
          </Card.Title>
          {/*<div class="progress">
            <div class="progress-bar bg-success" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="progress">
            <div class="progress-bar bg-info" role="progressbar"  aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="progress">
            <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="progress">
            <div class="progress-bar bg-danger" role="progressbar"  aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>*/}
            <hr/>
            <Card.Text>
              <h6>With supporting text below as a natural lead-in to additional content.</h6>

            </Card.Text>
            <Button class="btn btn-primary">See live report</Button>
        </Card.Body>
        <Card.Footer className="text-muted">
        Deadline: --/--/-- at --:-- OR a timer can be implimented.
        </Card.Footer>
    </Card>
    </div>
    </div>
  )
}

export default Live