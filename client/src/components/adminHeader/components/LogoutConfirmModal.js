import React from "react";
import {Button, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const LogoutConfirmModal = ({
                                     showLogout,
                                     setShowLogout
                                   }) => {
  const navigate = useNavigate();
  const onLogoutBtnClick = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  return (
    <Modal
      show={showLogout}
      onHide={() => setShowLogout(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You are going to Logout. Are you sure you want to Logout?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowLogout(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={onLogoutBtnClick}>Yes, I sure</Button>
      </Modal.Footer>
    </Modal>
  );
};