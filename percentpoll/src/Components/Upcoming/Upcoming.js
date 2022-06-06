import React ,{useState} from 'react'
import { Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


import './Upcoming.css'
import ViewPoll from './ViewPoll/ViewPoll';


function Upcoming(props) {
  const [show,setShow] = useState(false)


  const handleClickView = () =>{
      console.log(show)
      setShow(!show)  
    }
  
  return (
    <>
    {show && <ViewPoll show={show} handleModalView={handleClickView}/>}
    {!props.upcomingPolls[0].title &&
      <img
      alt="No Polls"
      src={props.noPolls}
      className="d-inline-block align-center"
      />
      }

    {props.upcomingPolls[0].title && 
      <div className="row" id='card'>
    {props.upcomingPolls.map(
      (upcomingPoll,index)=>(
        
        <div key={index} className="col-6">
        <Card className="text-start text-white bg-dark" id='card'>
        <Card.Body>
          <Card.Title>
            <h5 >{upcomingPoll.title}</h5>
          </Card.Title>
            <hr/>
            <Card.Text>
              This poll is scheduled to start on {upcomingPoll.open_date}
            </Card.Text>
            <Button variant="flat" onClick={handleClickView}>View poll</Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          Deadline: {upcomingPoll.close_date} at {upcomingPoll.close_time}
        </Card.Footer>
    </Card>
    </div>
      )

    )
    }
    </div>
    }
    
    </>
  )
}

export default Upcoming