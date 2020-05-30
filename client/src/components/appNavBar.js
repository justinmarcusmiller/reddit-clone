import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import { BrowserRouter as Link } from "react-router-dom";

class AppNavBar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div>
        <Navbar color="success" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand >Reddit Clone</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="nav-links-section mr-auto" navbar>
                <NavItem>
                  <Link className="nav-link" to="/">Home</Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/submit">Submit Link</Link>
                </NavItem>
              </Nav>
              <Nav className="nav-user-section ml-auto" navbar>
                <NavItem>
                <Link className="nav-link" to="/sign-up">Sign Up</Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/sign-in">Sign In</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavBar;
