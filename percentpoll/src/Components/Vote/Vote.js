import React from 'react'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

import './Vote.css'
import NavBar from '../Navbar/Navbar';

function Vote() {
    const pollOptionsArr= ["hghbfjhfbgf" ,"gjfjkdhfk","hgjhsbdfdjf","gvahvsdh"]
    var selectOptionId=[]
    var selectedOption = ""

    const handleSubmit = () =>{

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

  return (
        <div id='vote'>
        <NavBar/>
        <div className='container' id="cont">
            <h2>Title - </h2>
                <hr/>
                <h5>Poll Options.</h5>
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
                onClick={handleSubmit()}>
                Submit
            </Button>
        </div>
        </div>
        
  )
}

export default Vote