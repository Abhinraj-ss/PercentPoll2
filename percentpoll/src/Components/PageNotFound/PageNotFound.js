import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { useNavigate} from 'react-router-dom';

import NavBar from '../Navbar/Navbar'
import './PageNotFound.css'
import notFound from '../images/404.png'

function PageNotFound() {
  const navigate = useNavigate()

  return (
    <div id="pageNotFound" >
        <NavBar/>
        <div className="d-flex-center text-center pt-4">
        <Image
        className="noPolls"
        src={notFound}/>
        <span>Page Not Found</span>
        <Button size='lg' onClick={()=>navigate('/')} >
          Go Home
        </Button>
        
        </div>  
    </div>
  )
}

export default PageNotFound