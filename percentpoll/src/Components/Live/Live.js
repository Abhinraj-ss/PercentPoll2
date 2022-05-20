import React from 'react'

function Live() {
  return (
    <div className="card text-center">
        <div className="card-body">
            <h5 className="card-title">Title of the Poll</h5>
            <hr/>
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
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" className="btn btn-primary">See live report</a>
        </div>
        <div className= "card-footer text-muted">
            Deadline: --/--/-- at --:-- OR a timer can be implimented.
        </div>
    </div>
    
  )
}

export default Live