import React from 'react';

function Closed() {
  return (
    <div className="card text-end">
        <div className="card-body">
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
                <a href="#" className="btn btn-primary">See full report</a>
            </div>
        </div> 
        </div>
        <div className="card-footer text-muted">
        Closed 2 days ago
        </div>
    </div>
  )
}

export default Closed