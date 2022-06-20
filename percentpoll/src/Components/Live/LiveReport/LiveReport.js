import React, { useState } from 'react'
import {  Modal ,Button} from "react-bootstrap";

import DoughnutChart from '../../DoughnutChart';
import liveIcon from '../../images/radio_aqua.png'
import shareIcon from "../../images/share.png"
import Share from '../../Share/Share';
import emptyIcon from "../../images/empty.png"



function LiveReport(props) {
  const [showShare,setShowShare] = useState(false)
  const handleClickShare = () =>{
    setShowShare(!showShare)
  }
  return (
    <>
    {showShare&& <Share show={showShare} livePoll={props.livePoll} handleModalShare={handleClickShare}/>}
    <Modal show={props.show} fullscreen={props.show} onHide={()=>props.handleModalReport()}>
        <Modal.Header closeVariant="white" closeButton>
          <Modal.Title className='row'>
            <div className="col-auto">
            <img
                alt="liveIcon"
                src={liveIcon}
                width="45"
                height="45"
                className="d-inline-block"
              />
              Live Report
            </div>
          
              <h2 className='col mt-1'>&nbsp;&nbsp;{props.livePoll.title}</h2>
              </Modal.Title>

        </Modal.Header>
        <Modal.Body>
        <div className="container">
          {props.livePoll.poll_count===0?
          <>
            <div className="row" id="empty">
              <img
                alt="emptyIcon"
                src={emptyIcon}
                className="col-3"
                id="emptyIcon"
            />
              <div id="noVotes" className='col'>
                <h2>Nothing to show here.<br></br> Poll does not have any votes yet.</h2>  
                <h6 id='italic'> Share the link. Let your friends know about your poll.</h6>
                <Button className = " mt-4 share" id="cardBtn" variant="flat"  onClick={handleClickShare}><img
                    alt="shareIcon"
                    src={shareIcon}
                    id="btnIcon"
                    className="d-inline-block"
                  />Share Now !</Button>
              </div>
            </div>
          </>:
          <>
          <div className="chart" style={{width:'100%',height:'70vh'}}>
            <DoughnutChart poll={props.livePoll}/>
          </div>
          <h3>Total votes : {props.livePoll.poll_count}</h3>
          </>
          } 
        </div>
        </Modal.Body>
      </Modal>
    </>

  )
}

export default LiveReport