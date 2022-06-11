import React,{useEffect, useState} from 'react';
import { Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import moment from "moment";


import './Closed.css'
import ClosedReport from './ClosedReport/ClosedReport';
import reportIcon from "../images/finalReport.png"


function Closed(props) {
    const [show,setShow] = useState(false)
    const [closedPoll, setClosedPoll] = useState()

    const handleClickReport = (closedPoll) =>{
        setClosedPoll(closedPoll)
        setShow(!show)
        
    }

    const setTimeGap = (closedPoll) =>{
        const date1 = new Date(closedPoll.close_date);
        const date2 = new Date(moment().format("YYYY-MM-DD"));
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays
    }

    
  return (
      <>
      {show && <ClosedReport show={show} closedPoll={closedPoll} handleModalReport={handleClickReport}/>}
      {props.closedPolls[0].title &&
      <div className="row" id='card'>
      {props.closedPolls.map(
          (closedPoll,index,)=>(
            
            <div key={index} className="col-6">
                <Card className=" text-white bg-dark" id='card' >
                    <Card.Body>
                        <div className="row d-flex ">
                            <div className="col-4 "> 
                                <div id='percentVotes'>{closedPoll.maxPercent}%</div>
                                <p>
                                of votes.
                                </p>
                            </div>
                            <div className="col-8 text-end" id="closedCardEnd">
                            
                                <h4 className="card-title">{closedPoll.title}</h4>
                                <hr/>
                                {closedPoll.maxPollOptions.map(
                                    (option,index)=>(
                                        <h4 key={index} className="card-text">{option}</h4>
                                    )
                                )

                                }
                                <Button variant="flat" className="col-6"id= "full" onClick={()=>handleClickReport(closedPoll)} >
                                <img
                                    alt=""
                                    src={reportIcon}
                                    width="30"
                                    height="30"
                                    className="d-inline-block"
                                />See full report</Button>
                            </div>
                        </div> 
                       
                    </Card.Body>
                    {setTimeGap(closedPoll)>1 &&
                        <Card.Footer className="text-muted">
                                Closed {setTimeGap(closedPoll)} days ago
                        </Card.Footer>
                    }
                    {setTimeGap(closedPoll)<= 1 &&
                        <Card.Footer className="text-muted">
                                Closed {setTimeGap(closedPoll)} day ago
                        </Card.Footer>
                    }
            </Card>
        </div>
    ))}
</div>
      }

{!props.closedPolls[0].title &&

<img
alt="No Polls"
src={props.noPolls}
className="align-center"
/>
}
    </>
  )
}

export default Closed