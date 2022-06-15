import React, { useState,useEffect } from 'react'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

import './Vote.css'
import NavBar from '../Navbar/Navbar';
import { useParams ,useNavigate} from 'react-router-dom';

function Vote() {
    const pollId =useParams()
    const [title,setTitle] = useState()
    const [pollOptionsArr,setPollOptionsArr]= useState([])
    const navigate = useNavigate()
    const [url,setUrl] = useState(()=>{
    
        if(process.env.NODE_ENV==='production'){
          return "https://percentpoll2.herokuapp.com" 
        } else if(process.env.NODE_ENV==='development')
          return "http://localhost:5000"
      } )

    
    // ["surabi" ,"churabi","chundari","chakkara"]
    var selectOptionId=[]
    var selectedOption = ""
    console.log('url',pollId)
    console.log(title,pollOptionsArr)
    const handleSubmit = async() =>{
        const voteData ={"selected_option" : selectedOption}
        let res = await fetch(url+'/vote/'+pollId.pollId,{
            method : ['POST'],
            headers :{
                'Content-Type': 'application/json',
                "Accept":"application/json"
            },
            body: JSON.stringify(voteData)
        });
        if(res.status === 200){
            let message = await res.json()
            console.log("voting successful!!",message['message']);
            navigate('/')
          }
             
          else if(res.status === 201){
            console.log(res.json())
            console.log("voting unsuccessful!!");
          }
    }

    console.log(pollId.pollId)
    useEffect(() => {
        fetch(url+'/vote/'+pollId.pollId)
        .then(response => response.json())
        .then(data => {
            console.log(data,typeof(data),data['pollOptions'])
            setPollOptionsArr([...data['pollOptions']])
            setTitle(data['title'])});
    }, [])
    //  console.log(data,typeof(data),data['pollOptions'])
    
    
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


    /*<ListGroup>
                    {pollOptionsArr.map((option,index)=>(
                        <ListGroupItem id= {index} key={index}className=' btn my-2' onClick={(e)=>handleClickOption(e)} >
                        <h5>{option}</h5>
                        </ListGroupItem>
                    ))
                    } 
                </ListGroup> */
    
  return (
        <div id='vote'>
        <NavBar/>
        <div className='container' id="cont">
            <h2>{title} </h2>
                <hr/>
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
                className="btn-lg"
                onClick={handleSubmit}>
                Submit
            </Button>
        </div>
        </div>
        
  )
}

export default Vote