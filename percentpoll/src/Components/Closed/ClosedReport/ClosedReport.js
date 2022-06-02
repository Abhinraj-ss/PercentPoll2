import React, { useState } from 'react'
import { CloseButton, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ClosedReport(props) {
  console.log(props.show)
  const [show,setShow] = useState(props.show)
  return (
    <>
    <Modal show={show} fullscreen="true" onHide={()=>{setShow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Final Report</Modal.Title>
         
        </Modal.Header>
        <Modal.Body>
        <h3>Total number of voters : 100</h3>
          <h2>Dounut chart can be implimented here</h2>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ClosedReport