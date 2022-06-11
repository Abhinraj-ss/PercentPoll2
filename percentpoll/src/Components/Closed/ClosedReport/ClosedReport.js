import React from 'react'
import {  Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DoughnutChart from '../../DoughnutChart';
import './ClosedReport.css'
import reportIcon from "../../images/finalReport_aqua.png"

function ClosedReport(props) {
  console.log(props.show)
  console.log(props.closedPoll)
  return (
    <>
    <Modal show={props.show} fullscreen={props.show} onHide={()=>props.handleModalReport()}>
        <Modal.Header closeVariant="white" closeButton>
          <Modal.Title className="col-5">
          <img
            alt=""
            src={reportIcon}
            width="50"
            height="50"
            className="d-inline-block"
        />
        Final Report</Modal.Title>
         
        </Modal.Header>
        <Modal.Body>
          <div className="container">
          <h2 >{props.closedPoll.title}</h2>
          <div className="chart">
            <DoughnutChart id="chart"  poll={props.closedPoll}/>
          </div>
          <h3>Total votes : {props.closedPoll.poll_count}</h3>
          </div>
         
        
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ClosedReport