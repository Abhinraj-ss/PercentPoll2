import React,{ useState, useEffect} from 'react'
import ResponsiveAppBar from './Components/AppBar/AppBar'
import CreatePoll from './Components/CreatePoll/CreatePoll'
import { Button, Row, Col, Container,Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import LogIn from './Components/LogIn/LogIn';
import Register from './Components/Register/Register';

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
        <Row>
          <Col md>
            <LogIn/>
          </Col>
          <Col md>
            <Card mt-3>
              <Register/>
            </Card>
          </Col>
          <Col md>
            <Card mt-3>
              <LogIn/>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </div>
  )
}

export default App