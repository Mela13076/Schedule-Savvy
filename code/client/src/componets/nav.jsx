import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom'
import '../componets/nav.css'

function NavBar() {


    return (
      <Navbar style={{ backgroundColor: '#0000' }} bg="light" expand="lg" variant="light" className="py-3">
      <Container fluid>
        {/* Schedule Savvy Title */}
        <Navbar.Brand as={Link} to="/">Schedule Savvy</Navbar.Brand> {/* Use Link to navigate to the home page */}

        {/* Toggle button for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link> {/* Use Link to navigate to the Home page */}
            <Nav.Link as={Link} to="/new-task">New Task</Nav.Link> {/* Use Link to navigate to the New Task page */}
            <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link> {/* Use Link to navigate to the Calendar page */}
            <Nav.Link as={Link} to="/sign-in">Sign Out</Nav.Link> {/* Use Link to navigate to the Sign Out page */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
  }
  
export default NavBar