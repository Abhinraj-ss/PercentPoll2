import React from 'react'
import {  Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DoughnutChart from '../../DoughnutChart';
import liveIcon from '../../images/radio_aqua.png'

function LiveReport(props) {
  return (
    <>
    <Modal show={props.show} fullscreen={props.show} onHide={()=>props.handleModalReport()}>
        <Modal.Header closeVariant="white" closeButton>
          <Modal.Title className='col-5'>
          <img
                alt=""
                src={liveIcon}
                width="45"
                height="45"
                className="d-inline-block"
              />
              Live Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container">
          <h2 >{props.livePoll.title}</h2>
          <div className="chart">
            <DoughnutChart poll={props.livePoll}/>
          </div>
          <h3>Total votes : {props.livePoll.poll_count}</h3>
          </div>
        </Modal.Body>
      </Modal>
    </>

  )
}

export default LiveReport