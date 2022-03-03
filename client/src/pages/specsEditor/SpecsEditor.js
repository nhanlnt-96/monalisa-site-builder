import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSpecsContent} from "redux/specsContent/specsContentAction";
import api from "configs/axios";
import {Button, Col, Container, Row} from "react-bootstrap";
import LoadingComp from "components/loadingComp/LoadingComp";
import EditorTitle from "components/editorTitle/EditorTitle";
import EditorComp from "components/editor/EditorComp";
import MainSpecs from "components/mainSpecs/MainSpecs";

const SpecsEditor = () => {
  const dispatch = useDispatch();
  const specsContent = useSelector((state) => state.specsContent);
  const [isLoading, setIsLoading] = useState(false);
  const [specsSelected, setSpecsSelected] = useState(null);
  const [specsContentInput, setSpecsContentInput] = useState("");
  const onSelectSpecsHandler = (index) => {
    setSpecsSelected(index);
  };
  const onRefreshPreview = () => {
    dispatch(getSpecsContent());
  };
  const onUpdateBtnClick = async () => {
    setIsLoading(true);
    try {
      const response = await api.patch(`specs/update/${specsContent.specsData[specsSelected]?.id}`, {
        content: specsContentInput || specsContent.specsData[specsSelected]?.content
      });
      if (response.data.success) {
        setIsLoading(false);
        onRefreshPreview();
        setSpecsContentInput("");
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  return (
    <Container fluid className="editor-container">
      {
        specsContent.specsData.length <= 0 ? (
          <LoadingComp/>
        ) : (
          <>
            <Row className="editor-top-container">
              <Col lg={6}
                   md={6}
                   sm={12}
                   className="editor-item d-flex flex-column justify-content-center align-items-center">
                <EditorTitle title={(specsSelected === null) ? "Select Spot's item to edit" : `Editing Spot item ${specsSelected + 1}`}/>
                <div className="select-part-button-container">
                  {
                    specsContent.specsData?.map((val, index) => (
                      <button key={index} onClick={() => onSelectSpecsHandler(index)}
                              className={`select-part-button-item bg-primary ${index === specsSelected && "select-part-button-item-active"}`}> Item {index + 1}
                      </button>
                    ))
                  }
                </div>
              </Col>
              <Col lg={6} md={6} sm={12} className="editor-item">
                <EditorTitle title={"Spot's Description"}/>
                <EditorComp newValue={setSpecsContentInput}
                            content={specsContent.specsData[specsSelected]?.content || ""}/>
              </Col>
            </Row>
            <Row className="editor-update-button">
              <div className="update-button-container d-flex justify-content-center align-items-center">
                <Button className="update-btn" onClick={onUpdateBtnClick}
                        disabled={isLoading || typeof (specsSelected) !== "number" || !specsContent}>{isLoading ? "Updating" : "Update"}</Button>
              </div>
            </Row>
          </>
        )
      }
      <Row>
        <EditorTitle title={"Preview"}/>
        <div style={{backgroundColor: "#281726"}}>
          <MainSpecs/>
        </div>
      </Row>
    </Container>
  );
};

export default SpecsEditor;