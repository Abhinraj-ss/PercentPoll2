import React from 'react'

function Upcoming() {
  return (

    <div class="card text-center">
        <div class="card-body">
            <h5 class="card-title">Title of the Poll</h5>
            <p class="card-text">This poll is scheduled to start on --/--/---</p>
            <a href="#" class="btn btn-primary">Edit</a>
        </div>
        <div class="card-footer text-muted">
        Deadline: --/--/-- at --:--
        </div>
    </div>
    
  )
}

export default Upcoming