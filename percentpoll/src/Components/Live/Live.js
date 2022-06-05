import React, {useState, useEffect} from "react";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Live.css";
import LiveReport from "./LiveReport/LiveReport";

function Live() {
  const [show,setShow] = useState(false)
  const [livePolls,setlivePolls ]= useState([{}])


  const handleClickReport = () =>{
      console.log(show)
      setShow(!show)
        
    }
  const getPolls = async() =>{
    var userId =localStorage.getItem('user_id')
    var userData ={'user_id': userId}
    let res = await fetch('/live',{
      method : ['POST'],
      headers : {
        "Content-Type" : "application/json",
        "Accept":"application/json"
      },
      body : JSON.stringify(userData)
     
    });
    if(res.status === 200){
      console.log(res.json())
      console.log("no live polls!!");
    }
       
    else if(res.status === 201){
      res = await res.json()
      setlivePolls(res)
      console.log(res,livePolls )
      console.log("live polls exists!!");
    }
    
  }
  useEffect(() => {
    getPolls()
  }, []);
  return (
    <>
    {show&& <LiveReport show={show} handleModalReport={handleClickReport}/>}
    {livePolls.length !=0 &&
    <div className="row" id='card'>
    {livePolls.map(
      (livePoll,index)=>(
        <div key ={index} className="col-6">
        <Card className="text-center text-white bg-dark" id="card">
          <Card.Body>
            <Card.Title>
              <h5>{livePoll.title}</h5>
            </Card.Title>
            <div className="progressGroup ">
              <div class="progress">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div class="progress">
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
              <h6>
                With supporting text below as a natural lead-in to additional
                content.
              </h6>
            </Card.Text>
            <Button variant="flat" onClick={handleClickReport}>See live report</Button>
          </Card.Body>
          <Card.Footer className="text-muted">
            Deadline: {livePoll.close_date} at {livePoll.close_time} OR a timer can be implimented.
          </Card.Footer>
        </Card>
      </div>
      )
    )
    } 
    </div>
    }
    </>
  );
  
}

export default Live;
