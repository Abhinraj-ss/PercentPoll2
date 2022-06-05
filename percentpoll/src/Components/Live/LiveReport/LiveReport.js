import React from 'react'
import {  Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Donutchart from '../../DonutChart';

function LiveReport(props) {
  return (
    <>
    <Modal show={props.show} fullscreen={props.show} onHide={()=>props.handleModalReport()}>
        <Modal.Header closeVariant="white" closeButton>
          <Modal.Title>LiveReport</Modal.Title>
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

export default LiveReport