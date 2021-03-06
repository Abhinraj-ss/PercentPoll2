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
    <div className='tab'>
    {showShare&& <Share show={showShare} livePoll={livePoll} handleModalShare={handleClickShare}/>}
    {showReport&& <LiveReport show={showReport} livePoll={livePoll} handleModalReport={handleClickReport}/>}
    {!props.livePolls[0].title &&
      <img
      alt="No Polls"
      src={props.noPolls}
      className="noPolls"
      />
      }
    {props.livePolls[0].title &&
    <div className="row" >
    {props.livePolls.map(
      (livePoll,index)=>(
        <div key ={index} className="col-6">
        <Card className="text-center text-white" id="card">
          <Card.Body>
            <Card.Title>
              {livePoll.title}
            </Card.Title>
            <hr />
            <Card.Text className="row">
              
              {livePoll.maxPercent===0?<h5>
                Poll does not have any votes yet.
              </h5>:
              <div className="col-4  my-auto">
                {livePoll.maxPollOptions.map(
                  (option,index)=>(
                      <h4 key={index} className="card-text">{option}</h4>
                  )
              )}</div>}

              {livePoll.maxPollOptions.length>1 && livePoll.maxPercent>0 &&
                <>
                <div className="col my-auto text-center">
                <h6>are leading with &nbsp; </h6>
                </div>
                  <div className="col">

                  <h3>{livePoll.maxPercent}%  </h3>  
                  of votes.
                  </div>
                </>
              }
              {livePoll.maxPollOptions.length===1 &&
                <>
                  <div className="col my-auto text-center">
                <h6>is leading with &nbsp; </h6>
                </div>
                  <div className="col">

                  <h3>{livePoll.maxPercent}%  </h3>  
                  of votes.
                  </div>
                </>
              }

            </Card.Text>
            <div className="row liveBtnGroup">
              <div className = "col share">
              <Button  id="cardBtn" variant="flat"  onClick={()=>handleClickShare(livePoll)}>
                <img
                alt="shareIcon"
                src={shareIcon}
                id="btnIcon"
                className="d-inline-block"
              />Share</Button>
              </div>
            <div className="col report">
              <Button id="cardBtn" variant="flat" onClick={()=>handleClickReport(livePoll)}>
              <img
                  alt="reportIcon"
                  src={ReportIcon}
                  id="btnIcon"
                  className="d-inline-block"
                />See live report</Button>
            </div>
            
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
    
    </div>
  );
  
}

export default Live;
