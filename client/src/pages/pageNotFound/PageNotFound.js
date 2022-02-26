import React from "react";
import {useNavigate} from "react-router-dom";
import IconPNF from "assets/imgs/page-not-found.png";
import {Button} from "react-bootstrap";

import "./PageNotFound.scss";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="page-not-found d-flex flex-column justify-content-center align-items-center">
      <img src={IconPNF} alt="page-not-found"/>
      <h3>OOPS !!</h3>
      <h2>PAGE NOT FOUND</h2>
      <Button variant="light" className="back-home-btn" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </div>
  );
};

export default PageNotFound;