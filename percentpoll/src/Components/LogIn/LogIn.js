import  React,{useState} from 'react'
import { Button,Modal, CloseButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './LogIn.css'

function LogIn(props) {
  const [email,setEmail] = useState("");
  const [password, setPassword] =  useState("");

  //const data = ({email: email, password: password})
 
  console.log(email,password);

  return (

    <>
      <Modal show={props.modalOpen} 
        onHide={props.handleModalOpen} 
        centered='true' 
        backdrop="static"  
        keyboard={false}>
        <Modal.Header >
          <Modal.Title h4>LOG IN</Modal.Title>
          <CloseButton onClick={props.handleModalOpen} className='btn-close-white' name="closeLogin"/>
        </Modal.Header>
        <Modal.Body>
        <form class="">
          <div class="mb-3 form-group">
            <label class="form-label">Email address</label>
            <input required="" placeholder="Enter email" type="email" class="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} autoFocus/>
          </div>
          <div class="mb-3 form-group"><label class="form-label">Password</label>
            <input required="" placeholder="Password" type="password" class="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
        </form>
        <div className="d-grid  mb-3 " style={{marginTop:"7%"}}>
            <Button type="submit" variant="success" onClick={props.handleModalOpen} size="lg">Login</Button>
          </div>
        </Modal.Body>
        <Modal.Footer style={{display: "flex",justifyContent: "center",}}>
          <h6>
            Don't have an account? 
            <a href='/register'>Create one</a>
          </h6>
        </Modal.Footer>
      </Modal>
    </>)
}

export default LogIn