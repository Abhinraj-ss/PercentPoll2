import React,{ useState} from 'react'
import { Modal, CloseButton, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Register.css'

function Register(props) {
    const [name, setName] = useState("")
    const[email,setEmail]= useState("");
    const[password, setPassword] = useState("");
    const[cPassword, setCPassword] = useState("");

    //const data = ({email: email, password: password, cPassword:cPassword })

  return (

    <>
      <Modal show={props.modalOpen} onHide={props.handleModalOpen} centered='true' backdrop="static" keyboard={false}>
        <Modal.Header >
          <Modal.Title h4>REGISTER</Modal.Title>
          <CloseButton name="closeRegister" onClick={props.handleModalOpen}/>
        </Modal.Header>
        <Modal.Body>
        <form class="">
        <div class="mb-3 form-group">
            <label class="form-label">Name</label>
            <input required="" placeholder="Enter name" type="text" class="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} autoFocus/>
          </div>
          <div class="mb-3 form-group">
            <label class="form-label">Email address</label>
            <input required="" placeholder="Enter email" type="email" class="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>
          <div class="mb-3 form-group"><label class="form-label">Password</label>
            <input required="" placeholder="Password" type="password" class="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
          <div class="mb-3 form-group"><label class="form-label">Confirm Password</label>
            <input required="" placeholder="Password" type="password" class="form-control" value={cPassword} onChange={(e)=>{setCPassword(e.target.value)}}/>
          </div>
        </form>
        <div className="d-grid  mb-3 " style={{marginTop:"7%"}}>
            <Button type="submit" variant="success" size='lg' onClick={props.handleModalOpen}>Create</Button>
          </div>
        </Modal.Body>
        <Modal.Footer style={{display: "flex",justifyContent: "center",}}>
          <h6>
            Already have an account? 
            <a href='/login'>Login</a>
          </h6>
        </Modal.Footer>
      </Modal>
    </>)
}

export default Register