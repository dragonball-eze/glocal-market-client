import React from "react";
import { NavLink } from "react-router-dom";
import {Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap';
import axios from "axios";


function NavBar2({ loggedInUser, setCurrentLoggedInUser }) {
  const logoutUser = async () => {
    await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/logout`, null, {
      withCredentials: true,
    });
    setCurrentLoggedInUser("");
  };

  return loggedInUser ? (
    <>
      <Navbar bg="light" expand="lg">
        <Container >
          <Navbar.Brand href="/">Glocal Market</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {/* <Nav.Link href="/about">About</Nav.Link> */}
              
              <NavDropdown title="Market" id="basic-nav-dropdown">
                <NavDropdown.Item href="/books">Books</NavDropdown.Item>
                <NavDropdown.Item href="/clothes">Clothes</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href={`/profile/${loggedInUser._id}`}>My Profile</Nav.Link>
              <Nav.Link href="/">
                <Button variant="outline-dark" onClick={logoutUser}>Logout</Button>
                </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  ) : (
    <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Glocal Market</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {/* <Nav.Link href="/about">About</Nav.Link> */}
              <NavDropdown title="Market" id="basic-nav-dropdown">
                <NavDropdown.Item href="/books">Books</NavDropdown.Item>
                <NavDropdown.Item href="/clothes">Clothes</NavDropdown.Item>
                <NavDropdown.Divider />
                <Nav.Link href="/signup">
                <Button variant="outline-dark">Sign Up</Button>
                </Nav.Link>
                <Nav.Link href="/login">
                <Button variant="outline-dark">Log In</Button>
                </Nav.Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
  );
}

export default NavBar2;

