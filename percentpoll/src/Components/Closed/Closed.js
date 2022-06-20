import React,{ useState} from 'react';
import { Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


import './Closed.css'
import ClosedReport from './ClosedReport/ClosedReport';
import reportIcon from "../images/finalReport.png"


function Closed(props) {
    const [show,setShow] = useState(false)
    const [closedPoll, setClosedPoll] = useState()
    const now =new Date()
    const handleClickReport = (closedPoll) =>{
        setClosedPoll(closedPoll)
        setShow(!show)
        
    }

    const setTimeGap = (closedPoll) =>{
        const date1 = new Date(closedPoll.close_date);
        const date2 = new Date(now);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays
    }

    
  return (
      <div className='tab'>
      {show && <ClosedReport show={show} closedPoll={closedPoll} handleModalReport={handleClickReport}/>}
      {props.closedPolls[0].title &&
      <div className="row" >
      {props.closedPolls.map(
          (closedPoll,index,)=>(
            
            <div key={index} className="col-6">
                <Card className=" text-white" id='card' >
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
                                <Button variant="flat" id="cardBtn" onClick={()=>handleClickReport(closedPoll)} >
                                <img
                                    alt=""
                                    src={reportIcon}
                                    id="btnIcon"
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
className="noPolls"
/>
}
    </div>
  )
}

export default Closed