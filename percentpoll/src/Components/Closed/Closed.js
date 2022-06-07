import React,{useState} from 'react';
import { Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import './Closed.css'
import ClosedReport from './ClosedReport/ClosedReport';


function Closed(props) {
    const [show,setShow] = useState(false)


    const handleClickReport = () =>{
        console.log(show)
        setShow(!show)
        
    }
  return (
      <>
      {show && <ClosedReport show={show} handleModalReport={handleClickReport}/>}
      {props.closedPolls[0].title &&
      <div className="row" id='card'>
      {props.closedPolls.map(
          (closedPoll,index)=>(
            <div key={index} className="col-6">
                <Card className=" text-white bg-dark" id='card'>
                    <Card.Title>
                        <h5 >{closedPoll.title}</h5>
                    </Card.Title>
                    <Card.Body>
                        <div className="row ">
                            <div className="col-4 "> 
                                <div id='percentVotes'>90%</div>
                                <p>
                                of votes.
                                </p>
                            </div>
                            <div className="col-8 text-end">
                                <h5 className="card-title">{closedPoll.title}</h5>
                                <hr/>
                                <h4 className="card-text">Poll Option which opted more.</h4>
                            </div>
                        </div> 
                        <Button variant="flat" onClick={handleClickReport} >See full report</Button>
                    </Card.Body>
                <Card.Footer className="text-muted">
                Closed 2 days ago
                </Card.Footer>
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