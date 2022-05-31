import React, { useState } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  FormControl,
  Form,
  CloseButton,
  FloatingLabel,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./CreatePoll.css";

function CreatePoll({ closeCreatePoll }) {
  const [pollOptionList, setPollOptionList] = useState([
    { pollOption: "" },
    { pollOption: "" },
  ]);
  const [title, setTitle] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");

  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    closeCreatePoll(false);
  };
  console.log(title);
  console.log(pollOptionList);

  const handleClickAdd = () => {
    setPollOptionList([...pollOptionList, { pollOption: "" }]);
  };

  const handleClickRemove = (index) => {
    const list = [...pollOptionList];
    list.splice(index, 1);
    setPollOptionList(list);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  const handlePollOptionChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...pollOptionList];
    list[index][name] = value;
    setPollOptionList(list);
  };

  const addNewPoll = async () => {
    /*newPollData({
      "Title":title,
      "pollOptions": pollOptionList,
      "openingDate": openingDate,
      "openingTime": openingTime,
      "closingDate": closingDate,
      "closingTime": closingTime
    })*/
    const pollData = {
      Title: title,
      pollOptions: pollOptionList,
      openingDate: openingDate,
      openingTime: openingTime,
      closingDate: closingDate,
      closingTime: closingTime,
    };
    const res = await fetch("/newpoll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pollData),
    });
    if (res.ok) {
      console.log("response worked");
    }

    closeCreatePoll(false);
  };
  return (
    <>
      <Modal show={show} onHide={setShow} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title h4>CREATE POLL</Modal.Title>
          <CloseButton onClick={handleClose} className="btn-close-white" />
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <div class="mb-4 ">
              <FloatingLabel controlId="floatingInputGrid" label="Title Text">
                <FormControl
                  required=""
                  placeholder="Enter title text"
                  type="text"
                  onChange={(e) => {
                    handleTitleChange(e);
                  }}
                  autoFocus
                />
              </FloatingLabel>
            </div>

            <FormLabel className="form-label">Poll Options</FormLabel>
            {pollOptionList.map((singlePollOption, index) => (
              <div key={index} className="pollOptions">
                <div className="mb-4 row">
                  <div className="col-md-9">
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label="Poll Option"
                    >
                      <FormControl
                        required=""
                        placeholder="Poll Option"
                        name="pollOption"
                        type="text"
                        class="form-control"
                        value={singlePollOption.pollOption}
                        onChange={(e) => {
                          handlePollOptionChange(e, index);
                        }}
                      />
                    </FloatingLabel>
                  </div>
                  <Col col-auto>
                    {pollOptionList.length >= 2 && (
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => {
                          handleClickRemove(index);
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </Col>
                </div>
                <Col>
                  {pollOptionList.length - 1 === index && (
                    <div className=".col-auto mb-4  .me-auto">
                      <Button
                        type="button"
                        class="btn btn-primary"
                        onClick={handleClickAdd}
                      >
                        Add Poll Option
                      </Button>
                    </div>
                  )}
                </Col>
              </div>
            ))}
            <div className="form-group">
              <FormLabel class="form-label me-3">Opens On </FormLabel>
              <FloatingLabel controlId="floatingInputGrid" label="Opening Date">
                <FormControl
                  required=""
                  type="date"
                  placeholder="Opening time"
                  onChange={(e) => setOpeningDate(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInputGrid" label="Opening Time">
                <FormControl
                  type="time"
                  onChange={(e) => setOpeningTime(e.target.value)}
                />
              </FloatingLabel>
            </div>
            <div class="mb-3">
              <FormLabel class="form-label me-3">Closes On </FormLabel>
              <FloatingLabel controlId="floatingInputGrid" label="Closing Time">
                <FormControl
                  required=""
                  type="date"
                  placeholder="Closing time"
                  onChange={(e) => setClosingDate(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInputGrid" label="ClosingTime">
                <FormControl
                  type="time"
                  onChange={(e) => setClosingTime(e.target.value)}
                />
              </FloatingLabel>
            </div>
          </div>
          <div className="d-grid mb-4">
            <Button
              type="submit"
              variant="success"
              class="btn-lg"
              onClick={addNewPoll}
            >
              Create
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreatePoll;
