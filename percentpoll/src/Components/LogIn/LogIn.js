import  React,{useContext, useState} from 'react'
import { Button,Modal, CloseButton, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './LogIn.css'
import { userContext } from '../Contexts/userContext';

function LogIn(props) {
  const [email,setEmail] = useState("");
  const [password, setPassword] =  useState("");
  const [show, setShow] = useState(false);
  var {data,setData} = useContext(userContext)
  
  
  console.log(email,password);

  const handleSubmit = async() =>{
    
    var userData = {
      email: email,
      password:password}
    let res = await fetch('/login',{
      method : ['POST'],
      headers : {
        "Content-Type" : "application/json",
        "Accept":"application/json"
      },
      body : JSON.stringify(userData)
     
    });
    if(res.status === 200){
      console.log(res.json())
      console.log("Response Worked! but user does not exists!!");
      setShow(true)
    }
       
    else if(res.status === 201){
      res = await res.json()
      console.log(res)
      console.log("Response Worked! and user exists!!");
      localStorage.setItem('isLoggedIn','true')
      localStorage.setItem('user_id',JSON.stringify(res['user_id']))
      setData({isLoggedIn:true,email:email,password:password})
      props.handleModalOpen()
      //localStorage.setItem('modal_closing',"true")
    }
    console.log(data)
    
  }
  
  const handleClickRegister=()=>{
    props.handleRegisterModalOpen()
    props.handleModalOpen()
    
    
  }
  
    
  
  return (

    <>
      <Modal show={props.modalOpen} 
        onHide={props.handleModalOpen} 
        centered='true' 
        backdrop="static"  
        keyboard={false}>
        <Modal.Header >
          <Modal.Title >LOG IN</Modal.Title>
          <CloseButton onClick={props.handleModalOpen} className='btn-close-white' name="closeLogin"/>
        </Modal.Header>
        <Modal.Body>
        <Alert variant="danger"  show={show} onClose={() => setShow(false)} dismissible>
        <h6>User does not exists!</h6>
        </Alert>
        <form className="">
          <div className="mb-3 form-group">
            <label className="form-label">Email address</label>
            <input required="" placeholder="Enter email" type="email" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} autoFocus/>
          </div>
          <div className="mb-3 form-group"><label className="form-label">Password</label>
            <input required="" placeholder="Password" type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
        </form>
        <div className="d-grid  mb-3 " style={{marginTop:"7%"}}>
            <Button type="submit"  variant="success" onClick={handleSubmit} size="lg">Login</Button>
          </div>
        </Modal.Body>
        <Modal.Footer style={{display: "flex",justifyContent: "center",}}>
          <h6>
            Don't have an account? 
          </h6>
            <Button variant="link" size='lg' onClick={handleClickRegister}>Create one</Button>
        </Modal.Footer>
      </Modal>
    </>)
}

export default LogIn