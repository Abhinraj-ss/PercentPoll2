import  React,{useState, useContext} from 'react'
import { Button,Modal, CloseButton, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './LogIn.css'
import {userContext} from '../Contexts/userContext.js'

function LogIn(props) {
  const [email,setEmail] = useState("");
  const [password, setPassword] =  useState("");
  const [show, setShow] = useState(false);

  //const data = ({email: email, password: password})
  
  const currentUser = useContext(userContext)
  
  console.log(email,password);

  const handleSubmit = async() =>{
    
    const userData = {
      email: email,
      password:password}
    const res = await fetch('/login',{
      method : ['POST'],
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(userData)
     
    });
    console.log(res)
    if(res.status === 200){
      console.log("Response Worked! but user does not exists!!");
      setShow(true)
    }
      
    else if(res.status === 201){
      console.log("Response Worked! and user exists!!");
      props.handleModalOpen()
    }
     return (
      <currentUser.Provider value={userData}/>
     )
  }
  
  
    
  
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
        <Alert variant="danger" closeVariant='white' show={show} onClose={() => setShow(false)} dismissible>
        <h6>User does not exists!</h6>
        </Alert>
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
            <Button type="submit" variant="success" onClick={handleSubmit} size="lg">Login</Button>
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