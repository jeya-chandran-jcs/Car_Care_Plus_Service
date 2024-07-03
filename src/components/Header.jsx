import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import logo from '../assets/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';
import { useDispatch, useSelector } from 'react-redux';
import auth from '../services/auth';

const Header = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    auth.logout();
  };

  return (
    <Navbar bg="info" expand="lg" className="custom-navbar">
      <div className="container">
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Logo"
            className="logo-img d-inline-block align-top"
            width="30"
            height="30"
          />
          CAR CARE PLUS SERVICES
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom text-dark">
              <b>Home</b>
            </Nav.Link>
            <Nav.Link as={Link} to="/services" className="nav-link-custom text-dark">
              <b>Services</b>
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link-custom text-dark">
              <b>Contact</b>
            </Nav.Link>
            {userProfile.user ? (
              <>
                <Nav.Link as={Link} to="/profile" className="nav-link-custom text-dark ">
                  Profile
                </Nav.Link>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signup" >
                  <Button variant="primary">Sign Up</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/signin">
                  <Button variant="success">Sign In</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
