import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '.././styles/Landing_Page.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login'
import { Link } from 'react-router-dom';

export default function Landing_Page() {

  return (
    <div className='page-wrapper'>
      <div className='header'>
        <img className="logo" src="../images/logo.png" alt="bank-logo" />
      </div>

      <Row>
        <Col>
          <div className='content'>
            <h1 style={{ color: "white" }}>Prestige Prime Bank</h1>
            <h3 style={{ color: "#ff7a01" }}> Elevating Excellence in Banking</h3>
            <div className="cta-buttons" >
            <Link to="/login" className="btn primary-btn" style={{ color: "beige" }}>
              Log In
            </Link>
            <Link to="/register" className="btn secondary-btn">
              Sign Up
            </Link>

            </div>

          </div>`
        </Col>
        <Col className='image-wrapper'>
          <img className="landing-image" src='../images/content-img.png' style={{ "visibility": "visible", "animation-duration": "1500ms", "animation-delay": "0ms", "animation-name": "float-bob" }}></img>
        </Col>
      </Row>
    </div>
  )
}
