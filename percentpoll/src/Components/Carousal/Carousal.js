import React from 'react'
import {Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


import image1 from '../images/404.png'
import image2 from '../images/bg.jpg'
import image3 from '../images/NoPolls.png'

function Carousal() {
  return (
    <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image3}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image1}
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image2}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
  )
}

export default Carousal