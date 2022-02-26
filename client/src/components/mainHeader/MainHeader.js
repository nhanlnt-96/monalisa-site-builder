import React, {useState} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {mainHeaderMenu} from "configs/mainHeaderMenu";
import Logo from "assets/imgs/logo.webp";

import "./MainHeader.scss";

const MainHeader = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <Navbar collapseOnSelect expand="lg" className="main-header">
      <Container className="main-header-container">
        <Navbar.Brand href="#home" className="main-header-logo d-flex justify-content-center align-items-center">
          <img src={Logo} alt="delta-fitness-logo"/>
        </Navbar.Brand>
        <Navbar.Toggle onClick={() => setIsActive(!isActive)} aria-controls="responsive-navbar-nav"
                       className={`main-header-toggle-custom ${isActive && "active"}`}>
          <span className="toggle-line"/>
          <span className="toggle-line"/>
          <span className="toggle-line"/>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto main-header-menu justify-content-around">
            {
              mainHeaderMenu.map((val, index) => (
                <div key={index} className="header-menu-item">
                  <Nav.Link href={val.path} className="item">{val.label}</Nav.Link>
                </div>
              ))
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainHeader;