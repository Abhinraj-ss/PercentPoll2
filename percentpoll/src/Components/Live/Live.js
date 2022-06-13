import React, {useState} from "react";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Live.css";
import LiveReport from "./LiveReport/LiveReport";
import Share from "../Share/Share";
import shareIcon from "../images/share.png"
import ReportIcon from "../images/radio.png"


function Live(props) {
  const [showReport,setShowReport] = useState(false)
  const [showShare,setShowShare] = useState(false)
  const [livePoll, setLivePoll] = useState([])
  const [pollId,setPollId] = useState()
  const [title,setTitle] =useState()

  
  
  

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

  const handleClickReport = (livePoll) =>{
      console.log(showReport)
      setLivePoll(livePoll)
      setShowReport(!showReport)
    }
    const handleClickShare = (livePoll) =>{
      setLivePoll(livePoll)
      setShowShare(!showShare)
        
    }
  return (
    <>
    {showShare&& <Share show={showShare} livePoll={livePoll} handleModalShare={handleClickShare}/>}
    {showReport&& <LiveReport show={showReport} livePoll={livePoll} handleModalReport={handleClickReport}/>}
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
            <hr />
            <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
            </Card.Text>
            <div id="btnRowReport">
            <Button className = "col-3 share"  variant="flat"  onClick={()=>handleClickShare(livePoll)}><img
                alt=""
                src={shareIcon}
                width="21"
                height="20"
                className="d-inline-block"
              />Share</Button>
            <Button className = "col-4 report" variant="flat" onClick={()=>handleClickReport(livePoll)}>
            <img
                alt=""
                src={ReportIcon}
                width="25"
                height="25"
                className="d-inline-block"
              />See live report</Button>
            </div>
            
          </Card.Body>
          <Card.Footer className="text-muted">
          Deadline: {formatDate(livePoll.close_date)} at {tConvert(livePoll.close_time.substring(0,5))} 
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
