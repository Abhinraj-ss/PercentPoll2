import React,{ useState, useEffect} from 'react'
import ResponsiveAppBar from './Components/AppBar/AppBar'
import { Button, Row,Col, Container,Card ,Modal, ModalDialog, ModalHeader, ModalBody, ModalFooter} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


import LogIn from './Components/LogIn/LogIn';
import CreatePoll from './Components/CreatePoll/CreatePoll'
import Register from './Components/Register/Register';
import Upcoming from './Components/Upcoming/Upcoming';
import Live from './Components/Live/Live';
import Closed from './Components/Closed/Closed';
import Carousal from './Components/Carousal/Carousal';
import LiveReport from './Components/Live/LiveReport/LiveReport';
import ClosedReport from './Components/Closed/ClosedReport/ClosedReport';
import './App.css';
import ViewPoll from './Components/Upcoming/ViewPoll/ViewPoll';


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  /*const[ data, setData] = useState([{}])
  useEffect (() => {
      fetch("/members").then(
        res => res.json()
      ).then(
        data =>{
          setData(data)
          console.log(data)
        }
      )
    },[]
  )*/

  const handleClick = () =>{
    setIsOpen(true)
  }

  return (
    <div>
      <ResponsiveAppBar/>
      {isOpen&&
        <CreatePoll closeCreatePoll={setIsOpen}/>}
      {isOpenLogin&&
      <LogIn closeLogin={setIsOpenLogin}/>}
      {isOpenRegister&&
      <Register closeRegister={setIsOpenRegister}/>}
      {/*<Carousal/>*/}

      {/*{(typeof data.members === 'undefined')?(
        <p> Loading....</p>
      ): (
        data.members.map((member, i) => (
          <p key={i}> {member}</p>
        ))
        )}*/}
      <Container fluid >
        <div className="d-grid gap-2 col-4 mx-auto">
          <Button id="create" name='create' onClick={handleClick}>Create A Poll</Button>
        </div>
         <hr/>
        <Row >
          <div class="col-md-3 text-center">
            <h2>Upcoming Polls</h2>
            <Upcoming/>
          </div>

          {/*<div class="vr"></div>*/}

          <div class="col-md-6 text-center">
            <h2>Live Polls</h2>
            <Live/>
          </div>

          {/*<div class="vr"></div>*/}

          <div class="col-md-3 text-center">
            <h2>Closed Polls</h2>
            <Closed/>
          </div>
        </Row>

        <button type="button" class="btn btn-primary" onClick={handleClick}>
        Open modal
        </button>
        <button type="button" class="btn btn-primary" onClick={()=>setIsOpenRegister(true)}>
        Open register
        </button>
        <button type="button" class="btn btn-primary" onClick={()=>setIsOpenLogin(true)}>
        Open Login
        </button>
        
        {/*<Register/>
        <LogIn/>
      <CreatePoll/>*/}
      </Container>
      
    </div>

  )
}

export default App