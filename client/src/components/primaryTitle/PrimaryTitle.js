import React from "react";
import {Container, Row} from "react-bootstrap";

import "./PrimaryTitle.scss";

const PrimaryTitle = ({title}) => {
  return (
    <Container fluid className="primary-title d-flex justify-content-center align-items-center">
      <div className="primary-title-content d-flex justify-content-center align-items-center">
        <h6 className="title">{title}</h6>
      </div>
    </Container>
  );
};

export default PrimaryTitle;