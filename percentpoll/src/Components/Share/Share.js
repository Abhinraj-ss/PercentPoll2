import React from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton
  } from "react-share";

  import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon
  } from "react-share";

import "./Share.css"
import shareIcon from '../images/share_aqua.png'

function Share(props) {
  return (
    <Modal show={props.show} size="lg" aria-labelledby="contained-modal-title-vcenter" onHide={()=>props.handleModalShare()} centered>
      <Modal.Header closeVariant="white" closeButton>
        <Modal.Title className='col-5 d-flex-row' id="contained-modal-title-vcenter">
        <img
                alt=""
                src={shareIcon}
                width="36"
                height="36"
                className="d-inline-block"
              />Share
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex-row" id="shareBtnGroup">
            
            <WhatsappShareButton>
                <WhatsappIcon borderRadius={15}/>
            </WhatsappShareButton>
            <FacebookShareButton>
                <FacebookIcon borderRadius={15}/>
            </FacebookShareButton>
            <EmailShareButton>
                <EmailIcon borderRadius={15}/>
            </EmailShareButton>
            <TelegramShareButton>
                <TelegramIcon borderRadius={15}/>
            </TelegramShareButton>
            <TwitterShareButton>
                <TwitterIcon borderRadius={15}/>
            </TwitterShareButton>
            <LinkedinShareButton>
                <LinkedinIcon borderRadius={15}/>
            </LinkedinShareButton>
        </div>
      </Modal.Body>
      <Modal.Footer>
          
      </Modal.Footer>
      
    </Modal>
  );
}

export default Share;
