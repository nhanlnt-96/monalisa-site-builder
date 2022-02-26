import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import EditorTitle from "components/editorTitle/EditorTitle";
import EditorComp from "components/editor/EditorComp";
import {useDispatch, useSelector} from "react-redux";
import MainHowItWorks from "components/mainHowItWork/MainHowItWorks";
import api from "configs/axios";
import {finishUpdate} from "redux/finishUpdate/finishUpdateAction";
import {getHowWorkContent} from "redux/howWorkContent/howWorkContentAction";
import LoadingComp from "components/loadingComp/LoadingComp";

import "./HowWorkEditor.scss";

const HowWorkEditor = () => {
  const dispatch = useDispatch();
  const howWorkContent = useSelector((state) => state.howWorkContent);
  const [isLoading, setIsLoading] = useState(false);
  const [partEditSelected, setPartEditSelected] = useState(null);
  const [description, setDescription] = useState("");
  const [detail1, setDetail1] = useState("");
  const [detail2, setDetail2] = useState("");
  const [detail3, setDetail3] = useState("");
  const [detail4, setDetail4] = useState("");
  const [detail5, setDetail5] = useState("");
  const onSelectPartHandler = (index) => {
    setPartEditSelected(index);
  };
  const onUpdateBtnClick = async () => {
    setIsLoading(true);
    const response = await api.patch(`/how-work/update/${howWorkContent.howWorkData[partEditSelected].id}`, {
      description: description || howWorkContent.howWorkData[partEditSelected].description,
      detail1: detail1 || howWorkContent.howWorkData[partEditSelected].detail1,
      detail2: detail2 || howWorkContent.howWorkData[partEditSelected].detail2,
      detail3: detail3 || howWorkContent.howWorkData[partEditSelected].detail3,
      detail4: detail4 || howWorkContent.howWorkData[partEditSelected].detail4,
      detail5: detail5 || howWorkContent.howWorkData[partEditSelected].detail5
    });
    if (response.data.success) {
      setIsLoading(false);
      dispatch(finishUpdate(true));
      setDescription("");
      setDetail1("");
      setDetail2("");
      setDetail3("");
      setDetail4("");
      setDetail5("");
      dispatch(getHowWorkContent());
    }
  };
  return (
    <Container fluid className="editor-container">
      {
        howWorkContent.howWorkData.length <= 0 ? (
          <LoadingComp/>
        ) : (
          <>
            <Row className="editor-top-container">
              <Col className="editor-item d-flex flex-column justify-content-center align-items-center">
                <EditorTitle title={(partEditSelected === null) ? "Select part to edit" : `Editing part ${partEditSelected + 1}`}/>
                <div className="select-part-button-container">
                  {
                    howWorkContent.howWorkData.map((val, index) => (
                      <button key={index} onClick={() => onSelectPartHandler(index)}
                              className={`select-part-button-item bg-primary ${index === partEditSelected && "select-part-button-item-active"}`}>Part {index + 1}
                      </button>
                    ))
                  }
                </div>
              </Col>
            </Row>
            <Row className="editor-top-container">
              <Col className="editor-item">
                <EditorTitle title={"How It Works's Description"}/>
                <EditorComp newValue={setDescription}
                            content={howWorkContent.howWorkData[partEditSelected]?.description || ""}/>
              </Col>
              <Col className="editor-item">
                <EditorTitle title={"How It Work's Detail 1"}/>
                <EditorComp newValue={setDetail1}
                            content={howWorkContent.howWorkData[partEditSelected]?.detail1 || ""}/>
              </Col>
            </Row>
            <Row className="editor-top-container">
              <Col className="editor-item">
                <EditorTitle title={"How It Work's Detail 2"}/>
                <EditorComp newValue={setDetail2}
                            content={howWorkContent.howWorkData[partEditSelected]?.detail2 || ""}/>
              </Col>
              <Col className="editor-item">
                <EditorTitle title={"How It Work's Detail 3"}/>
                <EditorComp newValue={setDetail3}
                            content={howWorkContent.howWorkData[partEditSelected]?.detail3 || ""}/>
              </Col>
            </Row>
            <Row className="editor-top-container">
              <Col className="editor-item">
                <EditorTitle title={"How It Work's Detail 4"}/>
                <EditorComp newValue={setDetail4}
                            content={howWorkContent.howWorkData[partEditSelected]?.detail4 || ""}/>
              </Col>
              <Col className="editor-item">
                <EditorTitle title={"How It Work's Detail 5"}/>
                <EditorComp newValue={setDetail5}
                            content={howWorkContent.howWorkData[partEditSelected]?.detail5 || ""}/>
              </Col>
            </Row>
            <Row className="editor-update-button">
              <div className="update-button-container d-flex justify-content-center align-items-center">
                <Button className="update-btn" onClick={onUpdateBtnClick}
                        disabled={isLoading || (partEditSelected === null)}>{isLoading ? "Updating" : "Update"}</Button>
              </div>
            </Row>
          </>
        )
      }
      <Row>
        <EditorTitle title={"Preview"}/>
        <MainHowItWorks/>
      </Row>
    </Container>
  );
};

export default HowWorkEditor;