import React from "react";
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer-container">
      <div className="contact-us">
        <div>About Us</div>
        <div>
          <a href="https://github.com/Yue-Hao14/DivvyUp-Group-Project" target="_blank" rel="noreferrer">
            DivvyUp 2023
          </a>
        </div>
      </div>
      <div className="contact-info">
        <div className="contact-name">
          Nick Arakaki
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/nicholas-arakaki-10aa66149" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="contact-name">
          Troy Lee
          <div className="contact-links">
            <a href="#" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="contact-name">
          Yue Hao
          <div className="contact-links">
            <a href="#" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="contact-name">
          Tuan Tran
          <div className="contact-links">
            <a href="#" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
