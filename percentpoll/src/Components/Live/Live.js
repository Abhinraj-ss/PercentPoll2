import React, {useState} from "react";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Live.css";
import LiveReport from "./LiveReport/LiveReport";


function Live(props) {
  const [show,setShow] = useState(false)
  
  
  

  function formatDate (input) {
    var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1], day = datePart[2];
  
    return day+'/'+month+'/'+year;
  }
  function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }
  
  tConvert ('18:00:00');

  const handleClickReport = () =>{
      console.log(show)
      setShow(!show)
        
    }
  return (
    <>
    {show&& <LiveReport show={show} handleModalReport={handleClickReport}/>}
    {props.livePolls[0].title &&
    <div className="row" id='card'>
    {props.livePolls.map(
      (livePoll,index)=>(
        <div key ={index} className="col-6">
        <Card className="text-center text-white bg-dark" id="card">
          <Card.Body>
            <Card.Title>
              <h4>{livePoll.title}</h4>
            </Card.Title>
            <div className="progressGroup ">
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-info"
                  role="progressbar"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <hr />
            <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
            </Card.Text>
            <Button variant="flat" onClick={handleClickReport}>See live report</Button>
          </Card.Body>
          <Card.Footer className="text-muted">
          Deadline: {formatDate(livePoll.close_date)} at {tConvert(livePoll.close_time.substring(0,5))} OR a timer can be implimented.
          </Card.Footer>
        </Card>
      </div>
      )
    )
    } 
    </div>
    }
    {!props.livePolls[0].title &&

<img
alt="No Polls"
src={props.noPolls}
className="align-center"
/>
}
    </>
  );
  
}

export default Live;
