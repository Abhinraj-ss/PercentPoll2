import React ,{useState} from 'react'
import { Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


import './Upcoming.css'
import ViewPoll from './ViewPoll/ViewPoll';
import eyeIcon from "../images/eye.png"


function Upcoming(props) {
  const [show,setShow] = useState(false)
  const [pollData,setPollData] = useState({})

  const handleClickView = (index) =>{
      console.log(show,props.upcomingPolls[index])
      setPollData(props.upcomingPolls[index])
      setShow(!show)  
    }
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
  return (
    <div className='tab'>
    {show && <ViewPoll show={show} handleModalView={handleClickView} pollData={pollData}/>}
    {!props.upcomingPolls[0].title &&
      <img
      alt="No Polls"
      src={props.noPolls}
      className="noPolls"
      />
      }

    {props.upcomingPolls[0].title && 
      <div className="row" >
    {props.upcomingPolls.map(
      (upcomingPoll,index)=>(
        
        <div key={index} className="col-6">
        <Card className="text-start text-white" id='card'>
        <Card.Body>
          <Card.Title>
            {upcomingPoll.title}
          </Card.Title>
            <hr/>
            <Card.Text>
              This poll is scheduled to start on {upcomingPoll.open_date} at {tConvert(upcomingPoll.open_time.substring(0,5))}
            </Card.Text>
            <Button variant="flat" id="cardBtn"  onClick={()=>handleClickView(index)}>
            <img
                alt=""
                id ="btnIcon"
                src={eyeIcon}
                className="d-inline-block"
              />View poll</Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          Deadline: {formatDate(upcomingPoll.close_date)} at {tConvert(upcomingPoll.close_time.substring(0,5))}
        </Card.Footer>
    </Card>
    </div>
      )

    )
    }
    </div>
    }
    
    </div>
  )
}

export default Upcoming