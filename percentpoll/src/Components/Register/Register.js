import React,{ useState} from 'react'
import { Modal, CloseButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function Register(props) {
    const [show, setShow] = useState(true);
    const [name, setName] = useState("")
    const[email,setEmail]= useState("");
    const[password, setPassword] = useState("");
    const[cPassword, setCPassword] = useState("");

    //const data = ({email: email, password: password, cPassword:cPassword })

    const handleClose = () => {
      setShow(false)
    };

  return (

    <>
      <Modal show={props.modalOpen} onHide={props.handleModalOpen} backdrop="static" keyboard={false}>
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
        </Modal.Body>
        <Modal.Footer>
          <div className="d-grid gap-2 col-10 mx-auto mb-4">
            <button type="button" class="btn btn-primary btn-lg" onClick={props.handleModalOpen}>Create</button>
          </div>
        </Modal.Footer>
      </Modal>
    </>)
}

export default Register