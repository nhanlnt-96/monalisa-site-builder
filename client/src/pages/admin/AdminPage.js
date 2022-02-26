import React from "react";
import {Container, Row} from "react-bootstrap";
import AdminHeader from "components/adminHeader/AdminHeader";
import {Outlet} from "react-router-dom";

import "./AdminPage.scss";

const AdminPage = () => {
  return (
    <Container fluid className="admin-page-container">
      <AdminHeader/>
      <Outlet/>
    </Container>
  );
};

export default AdminPage;