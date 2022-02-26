import React from "react";
import {Container, Spinner} from "react-bootstrap";

const LoadingComp = () => {
  return (
    <Container fluid style={{height: "100vh"}} className="d-flex justify-content-center align-items-center">
      <Spinner animation="grow" variant="primary"/>
    </Container>
  );
};

export default LoadingComp;