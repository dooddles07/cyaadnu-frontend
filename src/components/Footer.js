import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/cya-logo-white.png" alt="CYA ADNU Logo" />
              <div>
                <h3>CYA ADNU</h3>
                <p>Christ's Youth in Action</p>
              </div>
            </div>
            <p className="footer-desc">
              Official merchandise store for CYA ADNU. Supporting youth ministry through quality products.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Shop</Link></li>
              <li><Link to="/about">About CYA</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li><FiMapPin /> Ateneo de Naga University</li>
              <li><FiPhone /> +63 XXX XXX XXXX</li>
              <li><FiMail /> cya@adnu.edu.ph</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://www.facebook.com/cya.bicol.adnu" target="_blank" rel="noopener noreferrer">
                <FiFacebook size={24} />
              </a>
              <a href="https://www.instagram.com/cya.bicol.adnu?igsh=MW1ieWJ2MmMxNG54aQ==" target="_blank" rel="noopener noreferrer">
                <FiInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CYA ADNU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
