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
        <>
        <NavBar/>
        <div className='app-requestEmail'>
            <h2>Enter Email</h2>
            <form onSubmit={handleSubmit}>
                <input
                className='input-requestEmail'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className='buttoninput-requestEmail' type="submit">Send OTP</button>
            </form>
        </div>
        <Footer/>
        </>
    );
};

export default RequestEmail;
