import React from 'react'
import '.././styles/Landing_Page.css'
import {Route,Routes,Router} from 'react-router-dom'
import Login from './Login'
import { Link} from 'react-router-dom';

export default function Landing_Page() {
  return (
    <div>
        
        <h1>Prestige Prime Bank</h1>
        <h3> Elevating Excellence in Banking</h3>
        <div className="cta-buttons">
          {/* <Router>
            <Route path="/login" className="btn primary-btn" exact component={Login} /> 
            </Router> */}
            
            <a href="/login" className="btn primary-btn"> 
            Log In
            </a> 
            <a href="/signup" className="btn secondary-btn">
            Sign Up
            </a>
        </div>
    </div>
  )
}
