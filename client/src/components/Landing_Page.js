import React from 'react'
import '.././styles/Landing_Page.css'

export default function Landing_Page() {
  return (
    <div>
        <h1>Prestige Prime Bank</h1>
        <h3> Elevating Excellence in Banking</h3>
        <div className="cta-buttons">
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
