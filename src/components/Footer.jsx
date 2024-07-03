import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css'; 

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-light">
      <div className="container text-center">
        <p>&copy; 2024 Car Care Plus Services. All rights reserved.</p>
        <div>
          <Link className="footer-link text-light mx-2" to="/privacy-policy">Privacy Policy</Link> | 
          <Link className="footer-link text-light mx-2" to="/terms-of-service">Terms of Service</Link>
        </div>
        <div className="social-icons mt-3">
          <a href="#" className="footer-icon text-light mx-2">
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a href="#" className="footer-icon text-light mx-2">
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a href="#" className="footer-icon text-light mx-2">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
