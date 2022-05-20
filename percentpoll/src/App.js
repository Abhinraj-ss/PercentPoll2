import React,{ useState, useEffect} from 'react'
import ResponsiveAppBar from './Components/AppBar/AppBar'
import { Button, Row, Col, Container,Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


import LogIn from './Components/LogIn/LogIn';
import CreatePoll from './Components/CreatePoll/CreatePoll'
import Register from './Components/Register/Register';
import Upcoming from './Components/Upcoming/Upcoming';
import Live from './Components/Live/Live';
import Closed from './Components/Closed/Closed';
import Carousal from './Components/Carousal/Carousal';
import './App.css';


function App() {
  const[ data, setData] = useState([{}])
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
  )
  return (
    <div>
      <ResponsiveAppBar/>
      <Carousal/>
      {(typeof data.members === 'undefined')?(
        <p> Loading....</p>
      ): (
        data.members.map((member, i) => (
          <p key={i}> {member}</p>
        ))
        )}
      <Container >
        <div className="d-grid gap-2 col-6 mx-auto">
          <Button id="create">CreatePoll</Button>
        </div>
         <hr/>
         {/*<CreatePoll/>*/}
        <Row>
          <Col md>
          <h2>Upcoming Polls</h2>
            <Card>
              <Upcoming/>
            </Card>
          </Col>
          <Col md>
          <h2>Live Polls</h2>
            <Card>
              <Live/>
            </Card>
          </Col>
          <Col md>
          <h2>Closed Polls</h2>
            <Card >
              <Closed/>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </div>
  )
}

export default App