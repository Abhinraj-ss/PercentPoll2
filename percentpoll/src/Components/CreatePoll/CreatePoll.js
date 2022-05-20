import {React, useState} from 'react'
import DateTimePicker from 'react-datetime-picker'
import { Button, Row, Col, Container,Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function CreatePoll() {
  const [opening, setOpening] = useState(new Date());
  const [closing, setClosing] = useState(new Date());
  const [pollOptionList, setPollOptionList] = useState([{pollOption:""},{pollOption:""}]);
  const [title, setTitle] = useState("")

  console.log(pollOptionList);

  const handleClickAdd =() => {
    setPollOptionList([...pollOptionList,{pollOption:""}]);
  }

  const handleClickRemove =(index) => {
    const list = [...pollOptionList];
    list.splice(index,1);
    setPollOptionList(list)
  }

  const handleTitleChange= (e) =>{
    const newTitle = e.target.value;
    setTitle(newTitle);
  }

  const handlePollOptionChange =(e, index) => {
    const {name, value} = e.target;
    const list = [...pollOptionList];
    list[index][name] = value;
    setPollOptionList(list);
  }

  return (
    <div class="modal-dialog modal-fullscreen-sm-down">
      <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title h4" id="contained-modal-title-vcenter">CREATE POLL
        </div>
        <button class="btn-close">
        </button>
      </div>
      <div class="modal-body">
        <form class="">
          <div class="mb-3 form-group">
            <label class="form-label">Title Text</label>
            <input required="" placeholder="Enter title text" type="text" class="form-control" value={title} onChange={(e)=>{handleTitleChange(e)}}/>
          </div>
          {pollOptionList.map((singlePollOption,index) => (
            <div key={index} className = "pollOptions">
              <div class="mb-3 form-group">
                <label className="form-label">Poll Option</label>
                <input required="" placeholder="Poll Option" name = "pollOption" type="text" class="form-control" value={singlePollOption.pollOption} onChange={(e) =>{handlePollOptionChange(e,index)}} />
              </div>
              <Row>
                <Col>
                  {pollOptionList.length - 1 === index && (
                    <div className='.col-auto .me-auto '>
                      <button type="button" class="btn btn-primary" onClick={handleClickAdd}>Add Poll Option</button>
                    </div>
                  )}
                </Col>
                <Col>
                  {pollOptionList.length  >= 2 && (
                    <div className='.col-auto'>
                      <button type="button" class="btn btn-primary" onClick={()=>{handleClickRemove(index)}}>Remove Poll Option</button>
                    </div>
                  )}
                </Col>
              </Row>
              </div>
          ))}
          <div className='mb-6'>
            <div class="mb-3 form-group"><label class="form-label">Opens on  </label>
              <DateTimePicker required="" placeholder="Opening time" type="datetime" class="form-control" onChange={setOpening} value={opening}/>
            </div>
            <div class="mb-3 form-group"><label class="form-label">Closes on  </label>
              <DateTimePicker required="" placeholder="Closing time" type="datetime" class="form-control" onChange={setClosing} value={closing}/>
            </div>
          </div>
        </form>
      </div>
      <div className="d-grid gap-2 col-6 mx-auto">
        <button type="button" class="btn btn-primary">Create</button>
      </div>
      </div>
    </div>
  )
}

export default CreatePoll