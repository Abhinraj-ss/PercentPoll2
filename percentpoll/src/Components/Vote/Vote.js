import React, { useState,useEffect } from 'react'
import { Button, ListGroup,Alert, ListGroupItem,Form } from 'react-bootstrap'
import axios from 'axios';

import './Vote.css'
import NavBar from '../Navbar/Navbar';
import { useParams ,useNavigate} from 'react-router-dom';
import loadingIcon from '../images/loading.png'
import LogIn from '../LogIn/LogIn';
import Register from '../Register/Register';

function Vote() {
    const poll_id =useParams()
    const [title,setTitle] = useState()
    const [pollOptionsArr,setPollOptionsArr]= useState([])
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [submit,setSubmit] = useState(false)
    const [userId,setUserId] = useState()
    const [selectAlert,setSelectAlert] = useState(false)
    const [userAlert,setUserAlert] = useState(false)
    const [url,setUrl] = useState(()=>{
    
        if(process.env.NODE_ENV==='production'){
          return "https://percentpoll2.herokuapp.com" 
        } else if(process.env.NODE_ENV==='development')
          return "http://localhost:5000"
      } )
    const hostId = localStorage.getItem('user_id')
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const [showLogin ,setShowlogIn] = useState(hostId===null?true:false)
    const[showRegister,setShowRegister]= useState(false)
    const api = axios.create({
        baseURL: url
      })
    
    var selectOptionId=[]
    var selectedOption = ""
    console.log('url',poll_id)
    console.log(title,pollOptionsArr)

    const handleSubmit = async() =>{
        setSubmit(true)
        await api.post('/vote/'+poll_id.pollId,{"selected_option" : selectedOption})
        .then(function (response) {
          console.log(response);
          if(response.status === 200){
            console.log(response.data.message);
            navigate('/')
          }
             
          else if(response.status === 201){
            console.log(response.json())
            console.log("voting unsuccessful!!");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    console.log(poll_id.pollId)
    useEffect(()=>{
        api.get('/vote/'+poll_id.pollId)
        .then(function (response) {
            console.log(response);
            let data = response.data
            setPollOptionsArr([...data.pollOptions])
            setTitle(data.title)
            setUserId(data.user_id)
        })
        .catch(function (error) {
            console.log(error);
        })
             
    }, [])
    const handleLoginModalOpen = ()=>{
        setShowlogIn(!showLogin)
    }

    const  handleRegisterModalOpen =() =>{
        setShowRegister(!showRegister)
      }
    
    const handleClickOption = (e) =>{
        selectedOption = e.target.textContent
        console.log(selectedOption)
        selectOptionId.push(e.target.id)
        var property = document.getElementById(e.target.id);
        if(selectOptionId.length===2){
            property.style.backgroundColor = "#035439fe"
            property = document.getElementById(selectOptionId[0]);
            property.style.backgroundColor = "#1e564333"
            selectOptionId.shift()
        }
        else if(selectOptionId.length===1){
            property.style.backgroundColor = "#035439fe"
        }
    }
    console.log(hostId,String(userId))
    const handleValidate = (event) =>{
        if (isLoggedIn==='true')
            {if (hostId === String(userId)) {
          event.preventDefault();
          event.stopPropagation();
          setUserAlert(true)
            }
            else if (selectedOption === "") {
                event.preventDefault();
                event.stopPropagation();
                setSelectAlert(true)

            }
            else{
            event.preventDefault();
            event.stopPropagation();
            handleSubmit()
            }}
        else{
            event.preventDefault();
            event.stopPropagation();
            setShowlogIn(true)
        }
        setValidated(true);
      }
  return (
        <div id='vote'>
            {showLogin && <LogIn show={showLogin} handleModalOpen={handleLoginModalOpen} handleRegisterModalOpen ={handleRegisterModalOpen}/>}
      {showRegister&&<Register show={showRegister} handleModalOpen={handleRegisterModalOpen} handleLoginModalOpen ={handleLoginModalOpen}/>}
        <NavBar/>
        <Form noValidate validated={validated} onSubmit={handleValidate}>
        
        <div className='container' id="cont">
            <h2>{title} </h2>
                <hr/>
                <div className="row">
                    <div className="col">

                    <Alert
                    variant="danger"
                    show={userAlert}
                    onClose={() => setUserAlert(false)}
                    dismissible
                ><h6>Host can not participate in a poll!</h6></Alert>
                    </div>
                    <div className="col-auto">
                    {userAlert &&
                <Button size='lg' onClick={()=>navigate('/')}>Go Home</Button>}
                    </div>
                </div>
                <Alert
                    variant="danger"
                    show={selectAlert}
                    onClose={() => setSelectAlert(false)}
                    dismissible
                ><h6>Please select anyone from the given options!</h6></Alert>
                <h6>You can SELECT ANY ONE of options listed below and click on SUBMIT button for being part of this poll.</h6>
                <ListGroup>
                    {pollOptionsArr.map((option,index)=>(
                        <ListGroupItem id= {index} key={index}className=' btn my-2' onClick={(e)=>handleClickOption(e)} >
                        <h5>{option}</h5>
                        </ListGroupItem>
                    ))
                    } 
                </ListGroup>
        </div>
        <div className="d-grid mt-auto col-3" id="createBtn">
            <Button
                type="submit"
                variant="success"
                className="btn-lg">
                    {
              submit &&
              <img
              alt="loading"
              src={loadingIcon}
              id="loadingIcon"
              className="d-inline-block"
            />
            }
                Submit
            </Button>
        </div>
        </Form>
        
        </div>
        
  )
}

export default Vote