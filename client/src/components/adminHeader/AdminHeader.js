import React, {useEffect, useState} from "react";
import {Container, Dropdown, Nav, Navbar} from "react-bootstrap";
import {adminHeaderMenu} from "configs/adminHeaderMenu";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserAuth} from "redux/getAuth/getAuthAction";
import {ChangePasswordModal, LogoutConfirmModal} from "components/adminHeader/components";

import "./AdminHeader.scss";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.getAuth.userData);
  const isLogged = useSelector((state) => state.auth.isLogged);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  useEffect(() => {
    if (!isLogged) dispatch(getUserAuth());
  }, []);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid className="admin-header-container">
        <Navbar.Brand onClick={() => navigate("")}>
          <img src={userData.avatarUrl} alt={userData.fullName}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="admin-header-toggle"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {
              adminHeaderMenu.map((val, index) => (
                <Link className="nav-link" key={index} to={val.path}>{val.label}</Link>
              ))
            }
          </Nav>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Signed in as <strong style={{fontWeight: "bolder"}}>{userData.fullName}</strong>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setShowChangePasswordModal(true)}>Change password</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={() => setShowLogoutModal(true)}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
      <LogoutConfirmModal showLogout={showLogoutModal} setShowLogout={setShowLogoutModal}/>
      <ChangePasswordModal showChangePassword={showChangePasswordModal || userData.isFirstLogin}
                           setShowChangePassword={setShowChangePasswordModal}/>
    </Navbar>
  );
};

export default AdminHeader;