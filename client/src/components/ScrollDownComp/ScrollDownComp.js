import React from "react";
import {Row} from "react-bootstrap";
import ScrollDownGif from "assets/gifs/scrollDown.gif";

const ScrollDownComp = () => {
  return (
    <Row className="scroll-down-comp d-flex justify-content-center align-items-center">
      <img src={ScrollDownGif} alt="liberT-scroll-down" style={{
        width: "80px",
        zIndex: 1
      }}/>
    </Row>
  );
};

export default ScrollDownComp;