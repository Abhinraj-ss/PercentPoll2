import React from 'react'

function Upcoming() {
  return (

    <div class="card text-start">
        <div class="card-body">
            <h5 class="card-title">Title of the Poll</h5>
            <hr/>
            <h6 class="card-text">This poll is scheduled to start on --/--/---</h6>
            <a href="#" class="btn btn-primary">View poll</a>
        </div>
        <div class="card-footer text-muted">
        Deadline: --/--/-- at --:--
        </div>
    </div>
    
  )
}

export default Upcoming