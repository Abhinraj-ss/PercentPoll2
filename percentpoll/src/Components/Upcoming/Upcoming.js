import React ,{useState, useEffect} from 'react'
import { Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


import './Upcoming.css'
import ViewPoll from './ViewPoll/ViewPoll';


function Upcoming() {
  const [show,setShow] = useState(false)
  const [upcomingPolls,setUpcomingPolls ]= useState([{}])

  const handleClickView = () =>{
      console.log(show)
      setShow(!show)  
    }
  const getPolls = async() =>{
      var userId =localStorage.getItem('user_id')
      var userData ={'user_id': userId}
      let res = await fetch('/upcoming',{
        method : ['POST'],
        headers : {
          "Content-Type" : "application/json",
          "Accept":"application/json"
        },
        body : JSON.stringify(userData)
       
      });
      if(res.status === 200){
        console.log(res.json())
        console.log("no upcoming polls!!");
      }
         
      else if(res.status === 201){
        res = await res.json()
        setUpcomingPolls(res)
        console.log(res,upcomingPolls )
        console.log("upcoming polls exists!!");
      }
      
    }
    useEffect(() => {
      getPolls()
    }, []);
  return (
    <>
    {show && <ViewPoll show={show} handleModalView={handleClickView}/>}
    {upcomingPolls.length !=0 && 
      <div className="row" id='card'>
    {upcomingPolls.map(
      (upcomingPoll,index)=>(
        
        <div key={index} className="col-6">
        <Card className="text-start text-white bg-dark" id='card'>
        <Card.Body>
          <Card.Title>
            <h5 >{upcomingPoll.title}</h5>
          </Card.Title>
            <hr/>
            <Card.Text>
              <h6>This poll is scheduled to start on {upcomingPoll.open_date}</h6>

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