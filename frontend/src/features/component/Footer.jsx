import React from "react";
import "../../styles/Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left */}
        <div className="footer-left">
          <h2>AI Resume Analyzer</h2>
          <p>
            Helping you improve your resume and prepare better for interviews 🚀
          </p>
        </div>

        {/* Center */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>

        {/* Right */}
        <div className="footer-social">
          <h3>Connect</h3>
          <div className="icons">
            <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.</p>
      </div>
    </footer>
  );
}