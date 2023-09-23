import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import './../styles/SessionExpired.css'
function SessionExpired() {
  return (
    <>
    <NavBar/>
    <br></br>
    <div className="session-expired-container">
        <div className='heading-container'>
            <h2 className='heading_se'>You have been logged out.</h2>
        </div>
    <p>Session expired.</p>
    </div>
    <Footer/>
    </>
  )
}

export default SessionExpired