import React, { useState,useRef } from "react";
import { Modal,Button, Form, FormControl } from "react-bootstrap";
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
import tickIcon from '../images/tick.png'

function Share(props) {
  const [livePoll,setLivePoll] = useState(props.livePoll)
  const link = 'https://percentpoll-2.herokuapp.com/vote/'+livePoll.poll_id
  const [copySuccess, setCopySuccess] = useState('Copy');
  const urlRef = useRef(null);
  const [btnIcon,setBtnIcon] = useState(linkIcon)

  function copyToClipboard(e) {
    navigator.clipboard.writeText(link)
    setBtnIcon(tickIcon)
    setCopySuccess('Copied!');
  };
  console.log(livePoll,link)
  return (
    <Modal show={props.show} size="lg" aria-labelledby="contained-modal-title-vcenter" onHide={()=>props.handleModalShare()} centered>
      <Modal.Header closeVariant="white" closeButton>
        <Modal.Title className='col-5 d-flex-row' id="contained-modal-title-vcenter">
        <img
                alt=""
                src={shareIcon}
                width="32"
                height="32"
                className="d-inline-block me-2"
              />Share
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>


      <div className="row">
        
      {
        navigator.clipboard &&
        <div className="d-flex mx-1">
        <Form   className='col-9'>
        <FormControl
          ref={urlRef}
          value={link}
        
        />

      </Form>
      <Button onClick={copyToClipboard} variant='success'id='copy' className=' col-3 '>
      <img
                alt="linkIcon"
                src={btnIcon}
                id="linkIcon"
                className="d-inline-block"
              />{copySuccess}</Button> 
          
        </div>
      }
      
    </div>

    <h5  className="mx-auto">Also share to</h5>
        <div className="d-flex-row" id="shareBtnGroup">
            <WhatsappShareButton title={livePoll.title}  url={link}>
                <WhatsappIcon id="shareSocial" borderRadius={15}/>
            </WhatsappShareButton>
            <FacebookShareButton quote={livePoll.title} hashtag="#percentpoll2" url={link}>
                <FacebookIcon id="shareSocial" borderRadius={15}/>
            </FacebookShareButton>
            <TelegramShareButton url={link} title={livePoll.title}>
                <TelegramIcon id="shareSocial" borderRadius={15}/>
            </TelegramShareButton>
            <TwitterShareButton url={link} title={livePoll.title} via="percent poll2" hashtags="#percentpoll2">
                <TwitterIcon id="shareSocial" borderRadius={15}/>
            </TwitterShareButton>
            <LinkedinShareButton url={link} title={livePoll.title} summary="Take part in the poll to find the 100% right choice." source="percent poll2">
                <LinkedinIcon id="shareSocial" borderRadius={15}/>
            </LinkedinShareButton>
        </div>
      </Modal.Body>
      
    </Modal>
  );
}

export default Share;
