import React from 'react'
import {  Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Donutchart from '../../DonutChart';
import './ClosedReport.css'
import reportIcon from "../../images/finalReport_aqua.png"

function ClosedReport(props) {
  console.log(props.show)
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
          <h3>Total number of voters : 100</h3>
          <div className="chart">
            <Donutchart/>
          </div>
        
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ClosedReport