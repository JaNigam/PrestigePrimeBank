import React from "react";
import "../styles/FirstPage.css";

export default function FirstPage() {
  return (
    <div className="landing-page">
      <header>
        <img className="logo" src="./images/ppb_logo-tp.png" />
        <h1>Welcome to Prestige Prime Bank</h1>
        <p>Elevating Excellence in Banking</p>
      </header>
      <div className="cta-buttons">
        <a href="/login" className="btn primary-btn">
          Log In
        </a>
        <a href="/signup" className="btn secondary-btn">
          Sign Up
        </a>
      </div>
    </div>
  );
}
