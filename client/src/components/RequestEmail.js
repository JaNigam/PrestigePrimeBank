import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '.././styles/RequestEmail.css'
import NavBar from './NavBar';
import Footer from './Footer';

const RequestEmail = () => {
    const history = useNavigate();
    const [email, setEmail] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();

        // try {
        const response = await fetch('http://localhost:8083/ppb/customer/requestchangepass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data); // Display success message
            history('/changepassword');
        } else {
            alert(data); // Display error message
        }
    };

    return (
        <div className='app-requestEmail'>
            <NavBar />
            <div className="form-container-requestEmail">
                <h2>Enter Email </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group-requestEmail" style={{ "width": "330px" }}
                    >

                        <label className='label-requestEmail'>Email:</label>
                        <input
                            type="email"
                            value={email}
                            className="input-field-requestEmail"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button-requestEmail" onClick={() => {
                     alert('Check you email for OTP');
                    }}>Send OTP</button>
                </form>
            </div>
            <div className='footer-requestEmail'>
                <Footer />
            </div>

        </div>





    );
};

export default RequestEmail;
