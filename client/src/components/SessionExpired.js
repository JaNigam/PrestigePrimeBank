import React from 'react';
import '.././styles/SessionExpired.css'
import NavBar from './NavBar';
import Footer from './Footer';
const SessionExpired = () => {
  // Replace this with your logic to fetch the last login time
  const lastLoginTime = "10:30 AM"; 

  return (
    <>
    <NavBar/>
    <div className="session-timeout-container">
      <div className="session-expired-content">
        {/* <div className='head-head'> */}
          <h2>You have been logged out</h2>
        {/* </div> */}
        <br></br>
        <p>Session Expired.</p>
        {/* <br></br> */}
        <p>Your last login was at {lastLoginTime}.</p>
        {/* <br></br> */}
        <p>For security reasons we have disabled back button.</p>
      </div>
      <div className="login-button-container">
       
        <button className="login-button" onClick={() => window.location.reload()}>
          Click here to log in
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SessionExpired;















// import React from 'react'
// import NavBar from './NavBar'
// import Footer from './Footer'
// import './../styles/SessionExpired.css'
// function SessionExpired() {
//   return (
//     <>
//     <NavBar/>
//     <br></br>
//     <div className="session-expired-container">
//       <div className='heading-container'>
//         <h3 className='heading_se'>You have been logged out.</h3>
//       </div>
//       <br/>
//       <p className='para-style'>Session expired.</p>
//     </div>
//     <Footer/>
//     </>
//   )
// }

// export default SessionExpired