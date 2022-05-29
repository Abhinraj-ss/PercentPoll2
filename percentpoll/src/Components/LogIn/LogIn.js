import  React,{useState} from 'react'
import { Modal, CloseButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


function LogIn({closeLogin,loginData}) {
  const [show, setShow] = useState(true);
  const [email,setEmail] = useState("");
  const [password, setPassword] =  useState("");

  const data = ({email: email, password: password})
 
  console.log(email,password);

  const handleClose = () => {
    setShow(false)
    closeLogin(false)
  };
  return (

    <>
      <Modal show={show} onHide={setShow} backdrop="static" keyboard={false}>
        <Modal.Header >
          <Modal.Title h4>LOG IN</Modal.Title>
          <CloseButton onClick={handleClose}/>
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
        </Modal.Body>
        <Modal.Footer>
          <div className="d-grid gap-2 col-10 mx-auto mb-4">
            <button type="submit" class="btn btn-primary btn-lg" onClick={()=>{
              loginData(data)
              closeLogin(false)}}>Create</button>
          </div>
        </Modal.Footer>
      </Modal>
    </>)
}

export default LogIn