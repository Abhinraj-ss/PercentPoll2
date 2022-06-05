import React,{useState,useEffect} from 'react';
import { Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import './Closed.css'
import ClosedReport from './ClosedReport/ClosedReport';

function Closed() {
    const [show,setShow] = useState(false)
    const [closedPolls,setclosedPolls ]= useState([{}])


    const handleClickReport = () =>{
        console.log(show)
        setShow(!show)
        
    }
    const getPolls = async() =>{
        var userId =localStorage.getItem('user_id')
        var userData ={'user_id': userId}
        let res = await fetch('/closed',{
          method : ['POST'],
          headers : {
            "Content-Type" : "application/json",
            "Accept":"application/json"
          },
          body : JSON.stringify(userData)
         
        });
        if(res.status === 200){
          console.log(res.json())
          console.log("no closed polls!!");
        }
           
        else if(res.status === 201){
          res = await res.json()
          setclosedPolls(res)
          console.log(res,closedPolls )
          console.log("closed polls exists!!");
        }
        
      }
      useEffect(() => {
        getPolls()
      }, []);
  return (
      <>
      {show && <ClosedReport show={show} handleModalReport={handleClickReport}/>}
      {closedPolls.length !=0 &&
      <div className="row" id='card'>
      {closedPolls.map(
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
      
    </>
  )
}

export default Closed