import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Modal, Button } from "react-bootstrap";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useAuth } from '../context/AuthContext';

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
    <>
      <Navbar style={{ width: '100%', backgroundColor: '#50C878', borderBottom: '2px solid #333333' }}>
        <Navbar.Brand href="/" style={{ color: '#FFFFFF' }}>Recycling Locator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {isLoggedIn ? (  // <-- Use isLoggedIn here
              <>
                <Nav.Link href="/profile" style={{ color: '#333333' }}>Profile</Nav.Link>
                <Nav.Link onClick={handleLogout} style={{ color: '#333333' }}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={() => setShowModal(true)} style={{ color: '#FFFFFF' }}>Login/Sign Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)} aria-labelledby="login-modal">
        <Modal.Header closeButton>
          <Modal.Title id="login-modal">
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
    </>
  );
};

export default AppNavbar;
