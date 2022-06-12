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
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon
  } from "react-share";

import "./Share.css"
import shareIcon from '../images/share_aqua.png'
import linkIcon from '../images/link.png'
import gmailIcon from '../images/gmail.png'

function Share(props) {
  const link = 'http://localhost:3000/vote/'+props.pollId
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
            <img
                alt=""
                src={linkIcon}
                width="62"
                height="68"
                className="pt-2"
              />
            <WhatsappShareButton title={props.title}  url={link}>
                <WhatsappIcon borderRadius={15}/>
            </WhatsappShareButton>
            <FacebookShareButton quote={props.title} hashtag="#percentpoll2" url={link}>
                <FacebookIcon borderRadius={15}/>
            </FacebookShareButton>
            <EmailShareButton url={link} subject={props.title} body={link} openShareDialogOnClick='true'>
              <img
                  alt=""
                  src={gmailIcon}
                  width="62"
                  height="80"
                />
            </EmailShareButton>
            <TelegramShareButton url={link} title={props.title}>
                <TelegramIcon borderRadius={15}/>
            </TelegramShareButton>
            <TwitterShareButton url={link} title={props.title} via="percent poll2" hashtags="#percentpoll2">
                <TwitterIcon borderRadius={15}/>
            </TwitterShareButton>
            <LinkedinShareButton url={link} title={props.title} summary="Take part in the poll to find the 100% right choice." source="percent poll2">
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
