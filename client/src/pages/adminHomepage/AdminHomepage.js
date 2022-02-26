import React from "react";
import {Container, Row} from "react-bootstrap";
import Logo from "assets/imgs/bgAdminHome.svg";

import "./AdminHomepage.scss";
import UploadImg from "components/uploadImg/UploadImg";

const AdminHomepage = () => {
  return (
    <Container fluid className="admin-homepage-container">
      <Container className="admin-homepage-content d-flex flex-column justify-content-center align-items-center">
        <Row className="d-flex flex-column justify-content-center align-items-center">
          <img src={Logo} alt="logo"/>
          <h1 className="title">Welcome to <span>Project name</span> Admin page</h1>
        </Row>
      </Container>
    </Container>
  );
};

export default AdminHomepage;