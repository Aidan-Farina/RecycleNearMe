import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Modal, Button } from "react-bootstrap";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';
import '../index.css';

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const { authUser, setAuthUser, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="fixed-navbar">
      <Navbar.Brand as={Link} to="/" style={{ color: '#50C878', fontSize: '24px', fontWeight: 'bold' }}>
        RecycleMe
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {isLoggedIn ? (
            <>
              <Nav.Link as={Link} to="/profile" style={{ color: '#333333' }}>Profile</Nav.Link>
              <Nav.Link onClick={handleLogout} style={{ color: '#333333' }}>Logout</Nav.Link>
            </>
          ) : (
            <Nav.Link
              onClick={() => setShowModal(true)}
              style={{
                color: '#50C878',
                fontWeight: 'bold',
                transition: 'color 0.2s',
              }}
            >
              Login/Sign Up
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)} aria-labelledby="login-modal">
        <Modal.Header closeButton>
          <Modal.Title id="login-modal" className="text-center">
            {showSignup ? "Sign Up" : "Login"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showSignup ? (
            <SignupForm handleModalClose={() => setShowModal(false)} />
          ) : (
            <LoginForm handleModalClose={() => setShowModal(false)} />
          )}
        </Modal.Body>
        <Modal.Footer>
          {showSignup ? (
            <Button variant="secondary" onClick={() => setShowSignup(false)}>
              Already have an account?
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => setShowSignup(true)}>
              Don't have an account? Sign Up
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default AppNavbar;
