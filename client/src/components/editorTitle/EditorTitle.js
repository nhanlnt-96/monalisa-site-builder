import React from "react";
import {Container} from "react-bootstrap";

import "./EditorTitle.scss";

const EditorTitle = ({title}) => {
  return (
    <Container fluid className="editor-title-comp d-flex justify-content-center align-items-center">
      <div className="editor-title-container bg-dark d-flex justify-content-center align-items-center">
        <h2 className="title">{title}</h2>
      </div>
    </Container>
  );
};

export default EditorTitle;