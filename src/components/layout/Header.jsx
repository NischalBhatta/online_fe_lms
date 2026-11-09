import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { MdDashboard } from "react-icons/md";
import { IoExit } from "react-icons/io5";

import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.userInfo);
  return (
    <Navbar expand="lg" className="bg-dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">LMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" href="/">
              Home
            </Link>
            {user?._id ? (
              <>
                <Link className="nav-link" href="/user">
                  <MdDashboard />
                  Dashboard
                </Link>
                <Link className="nav-link" href="/">
                  <IoExit />
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-link" href="/signup">
                  Sign Up
                </Link>
                <Link className="nav-link" href="/login">
                  Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
