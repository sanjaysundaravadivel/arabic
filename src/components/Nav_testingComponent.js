// import "./App.css";
import "../style/custom_css.css";
// icons
// import HomeIcon from '@mui/icons-material/Home';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React,{useState,useEffect,useRef} from 'react'

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { DarkModeContext } from "../context/darkModeContext";
import { useContext } from "react";
function Nav_testingComponent() {
  const { dispatch } = useContext(DarkModeContext);
  const [dark,setDark]=useState(false);
  return (
    <>
      {/* false, 'sm', 'md', 'lg', 'xl', 'xxl' */}
      {[false].map((expand) => (
        <Navbar
          fixed="top"
          className="navbar_custom"
          key={expand}
          expand={expand}
               >
          <Container fluid>
            <Navbar.Brand class=" p-2 ">
              {" "}
              <Row>
                <Col class=" custom_padding "><div class=" ">   </div></Col>
                <Col> {/* <iconify-icon icon="uil:home"></iconify-icon> */}
                  <span className="page_title_1">Invoice R</span>
                  <span className="page_title_2">ecognition</span>
                </Col>

              </Row>

            </Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  DigiverZ
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/dashboard">Home</Nav.Link>
                  <div className="left-side" style={{    marginTop: "40px",
    marginBottom: "40px",height:"40px"}} onClick={()=>{
      setDark(!dark)
     if(!dark){
      dispatch({ type: "DARK" })
      console.log("Dark")
     }
     else{
      dispatch({ type: "LIGHT" })
      console.log("Light")
     }
   }}>
  { dark?<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" style={{height:"40px"}}
	 viewBox="0 0 246 246" >
<path d="M189.024,122.5c0,36.188-29.336,65.524-65.524,65.524c-36.188,0-65.524-29.336-65.524-65.524
	c0-36.188,29.336-65.524,65.524-65.524C159.688,56.976,189.024,86.312,189.024,122.5z M122.667,43c4.143,0,7.5-3.357,7.5-7.5v-28
	c0-4.143-3.357-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v28C115.167,39.643,118.524,43,122.667,43z M184.444,68.438
	c1.919,0,3.839-0.732,5.304-2.197l14.849-14.85c2.929-2.929,2.929-7.678-0.001-10.606c-2.928-2.928-7.677-2.929-10.606,0.001
	l-14.849,14.85c-2.929,2.929-2.929,7.678,0.001,10.606C180.605,67.705,182.525,68.438,184.444,68.438z M190.366,178.14
	c-2.93-2.928-7.678-2.928-10.607,0c-2.929,2.93-2.929,7.678,0,10.607l14.85,14.85c1.465,1.464,3.385,2.196,5.304,2.196
	s3.839-0.732,5.304-2.196c2.929-2.93,2.929-7.678,0-10.607L190.366,178.14z M57.253,178.759l-14.85,14.85
	c-2.929,2.93-2.929,7.678,0,10.607c1.465,1.464,3.385,2.196,5.304,2.196s3.839-0.732,5.304-2.196l14.85-14.85
	c2.929-2.93,2.929-7.678,0-10.607C64.931,175.831,60.183,175.831,57.253,178.759z M56.634,66.859
	c1.465,1.465,3.384,2.197,5.304,2.197c1.919,0,3.839-0.732,5.303-2.196c2.93-2.929,2.93-7.678,0.001-10.606l-14.849-14.85
	c-2.93-2.93-7.679-2.929-10.606-0.001c-2.93,2.929-2.93,7.678-0.001,10.606L56.634,66.859z M238.5,114.5h-7h-21
	c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h21h7c4.143,0,7.5-3.357,7.5-7.5S242.643,114.5,238.5,114.5z M123.667,202
	c-4.143,0-7.5,3.357-7.5,7.5v21v8c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5v-8v-21C131.167,205.357,127.81,202,123.667,202z
	 M44,123c0-4.143-3.357-7.5-7.5-7.5h-21h-8c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h8h21C40.643,130.5,44,127.143,44,123z"/>

</svg>
:<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" style={{height:"40px"}}
	 viewBox="0 0 455 455" fill="currentColor"  >
<g>
	<polygon points="320.18,162.705 280.63,171.052 307.72,201.052 303.437,241.245 340.34,224.751 377.243,241.245 372.96,201.052 
		400.05,171.052 360.5,162.705 340.34,127.67 	"/>
	<polygon points="440,325.677 414.091,320.208 400.883,297.253 387.675,320.208 361.766,325.677 379.513,345.33 376.708,371.661 
		400.884,360.855 425.063,371.661 422.254,345.329 	"/>
	<path d="M218,227.5c0-89.167,51.306-166.338,126-203.64C313.443,8.6,278.978,0,242.5,0C116.855,0,15,101.855,15,227.5
		S116.855,455,242.5,455c36.478,0,70.943-8.6,101.5-23.86C269.306,393.838,218,316.667,218,227.5z"/>
</g>
</svg>
}
   </div>

                </Nav>
               
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Nav_testingComponent;
