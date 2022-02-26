import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import EditorTitle from "components/editorTitle/EditorTitle";
import EditorComp from "components/editor/EditorComp";
import {useDispatch, useSelector} from "react-redux";
import api from "configs/axios";
import {finishUpdate} from "redux/finishUpdate/finishUpdateAction";
import MainRoadmap from "components/mainRoadmap/MainRoadmap";
import {getRoadmapContent} from "redux/roadmapContent/roadmapContentAction";
import LoadingComp from "components/loadingComp/LoadingComp";

const RoadmapEditor = () => {
  const dispatch = useDispatch();
  const roadmapContent = useSelector((state) => state.roadmapContent);
  const [isLoading, setIsLoading] = useState(false);
  const [phaseEditSelected, setPhaseEditSelected] = useState(null);
  const [roadmapTitle, setRoadmapTitle] = useState("");
  const [roadmapDescription, setRoadmapDescription] = useState("");
  const onSelectPhaseHandler = (index) => {
    setPhaseEditSelected(index);
  };
  const onUpdateBtnClick = async () => {
    setIsLoading(true);
    const response = await api.patch(`/roadmap/update/${roadmapContent.roadmapData[phaseEditSelected].id}`, {
      title: roadmapTitle || roadmapContent.roadmapData[phaseEditSelected].title,
      description: roadmapDescription || roadmapContent.roadmapData[phaseEditSelected].description
    });
    if (response.data.success) {
      setIsLoading(false);
      dispatch(finishUpdate(true));
      setRoadmapTitle("");
      setRoadmapDescription("");
      dispatch(getRoadmapContent());
    }
  };
  return (
    <Container fluid className="editor-container">
      {
        roadmapContent.roadmapData.length <= 0 ? (
          <LoadingComp/>
        ) : (
          <>
            <Row className="editor-top-container">
              <Col className="editor-item d-flex flex-column justify-content-center align-items-center">
                <EditorTitle title={(phaseEditSelected === null) ? "Select phase to edit" : `Editing phase ${phaseEditSelected + 1}`}/>
                <div className="select-part-button-container">
                  {
                    roadmapContent.roadmapData.map((val, index) => (
                      <button key={index} onClick={() => onSelectPhaseHandler(index)}
                              className={`select-part-button-item bg-primary ${index === phaseEditSelected && "select-part-button-item-active"}`}>Phase {index + 1}
                      </button>
                    ))
                  }
                </div>
              </Col>
            </Row>
            <Row className="editor-top-container">
              <Col className="editor-item">
                <EditorTitle title={"Roadmap's Title"}/>
                <EditorComp newValue={setRoadmapTitle}
                            content={roadmapContent.roadmapData[phaseEditSelected]?.title || ""}/>
              </Col>
              <Col className="editor-item">
                <EditorTitle title={"Roadmap's Description"}/>
                <EditorComp newValue={setRoadmapDescription}
                            content={roadmapContent.roadmapData[phaseEditSelected]?.description || ""}/>
              </Col>
            </Row>
            <Row className="editor-update-button">
              <div className="update-button-container d-flex justify-content-center align-items-center">
                <Button className="update-btn" onClick={onUpdateBtnClick}
                        disabled={isLoading || (phaseEditSelected === null)}>{isLoading ? "Updating" : "Update"}</Button>
              </div>
            </Row>
          </>
        )
      }
      <Row>
        <EditorTitle title={"Preview"}/>
        <MainRoadmap/>
      </Row>
    </Container>
  );
};

export default RoadmapEditor;