import React from 'react'
import '../styles/About.css'
import NavBar from './NavBar';
import Footer from './Footer';
const About = () => {
  return (
    <>
    <NavBar/>
    
    <div className="about-us-container">
      
            <div className="about-us-column">
                <h2 style ={{color:'black'}}>About Us</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus auctor euismod massa eget suscipit. Fusce nec mi nec urna bibendum
                    tristique. Etiam ac ante quis dui convallis venenatis. Ut ac est lectus.
                </p>
                <img style={{
                borderRadius:'20px', 

            }} src="/images/read.png" alt="pms" 
            height={200} width={200}></img>
            </div>
            <div className="about-us-column">
                <h2 style ={{color:'black'}}>Our Mission</h2>
                <p>
                    Nulla facilisi. Proin scelerisque, neque non dictum aliquam,
                    elit turpis tristique ex, ut ultricies dolor est vel nisi. Sed vitae venenatis dui.
                    Fusce tincidunt venenatis quam vel ultrices elit turpis .
                </p>
                <img style={{
                borderRadius:'20px',     
            }} src="/images/mission.jpg" alt="pms" 
            height={200} width={200}></img>
            </div>
            <div className="about-us-merge">
                <div className="merged-content">
                    <h2 style ={{color:'black'}}>Our Values</h2>
                    <p>
                        We are dedicated to providing the best products and services to our customers.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor euismod
                        massa eget suscipit. Fusce nec mi nec urna bibendum tristique.
                    </p>
                </div>
            </div>
        </div>
        <Footer/>
        </> 
  );
}

export default About