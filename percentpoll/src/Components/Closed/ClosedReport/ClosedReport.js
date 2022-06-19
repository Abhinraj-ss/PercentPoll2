import React from 'react'
import {  Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DoughnutChart from '../../DoughnutChart';
import './ClosedReport.css'
import reportIcon from "../../images/finalReport_aqua.png"
import emptyIcon from "../../images/empty.png"

function ClosedReport(props) {
  console.log(props.show)
  console.log(props.closedPoll)
  return (
    <>
    <Modal show={props.show} fullscreen={props.show} onHide={()=>props.handleModalReport()}>
        <Modal.Header closeVariant="white" closeButton>
          <Modal.Title className="row">
          <div className="col-auto">
          <img
            alt="reportIcon"
            src={reportIcon}
            width="50"
            height="50"
            className="d-inline-block col"
        />
        Final Report
        </div>
        <h2 className='col mt-1 '>&nbsp;&nbsp;{props.closedPoll.title}</h2></Modal.Title>
         
        </Modal.Header>
        <Modal.Body>
          <div className="container">
          {props.closedPoll.poll_count==0?
          <>
          <div className="row" id="empty">
          <img
            alt="emptyIcon"
            src={emptyIcon}
            className="col"
            id="emptyIcon"
        />
        <div id="noVotes" className='col'>
            <h2>Nothing to show here. </h2>  
            <h5>Poll ended without having any votes.</h5>
          </div>
          </div>
          </>
          :
          <>
            <div className="chart">
              <DoughnutChart id="chart"  poll={props.closedPoll}/>
            </div>
            <h3>Total votes : {props.closedPoll.poll_count}</h3>
            </>
          }
          
          
          </div>
         
        
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ClosedReport