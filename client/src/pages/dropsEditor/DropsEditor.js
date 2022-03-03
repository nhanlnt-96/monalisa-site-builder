import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import api from "configs/axios";
import {Button, Col, Container, Row} from "react-bootstrap";
import LoadingComp from "components/loadingComp/LoadingComp";
import EditorTitle from "components/editorTitle/EditorTitle";
import EditorComp from "components/editor/EditorComp";
import {getDropsContent} from "redux/dropsContent/dropsContentAction";
import MainDrops from "components/mainDrops/MainDrops";

const DropsEditor = () => {
  const dispatch = useDispatch();
  const dropsContent = useSelector((state) => state.dropsContent);
  const [isLoading, setIsLoading] = useState(false);
  const [dropsSelected, setDropsSelected] = useState(null);
  const [dropsTitleInput, setDropsTitleInput] = useState("");
  const [dropsContentInput, setDropsContentInput] = useState("");
  const onSelectSpecsHandler = (index) => {
    setDropsSelected(index);
  };
  const onRefreshPreview = () => {
    dispatch(getDropsContent());
  };
  const onUpdateBtnClick = async () => {
    setIsLoading(true);
    try {
      const response = await api.patch(`drops/update/${dropsContent.dropsData[dropsSelected]?.id}`, {
        title: dropsTitleInput || dropsContent.dropsData[dropsSelected]?.title,
        content: dropsContentInput || dropsContent.dropsData[dropsSelected]?.content
      });
      if (response.data.success) {
        setIsLoading(false);
        onRefreshPreview();
        setDropsTitleInput("");
        setDropsContentInput("");
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  return (
    <Container fluid className="editor-container">
      {
        dropsContent.dropsData.length <= 0 ? (
          <LoadingComp/>
        ) : (
          <>
            <Row className="editor-top-container">
              <Col
                className="editor-item d-flex flex-column justify-content-center align-items-center">
                <EditorTitle title={(dropsSelected === null) ? "Select Drop's item to edit" : `Editing Drop item ${dropsSelected + 1}`}/>
                <div className="select-part-button-container">
                  {
                    dropsContent.dropsData?.map((val, index) => (
                      <button key={index} onClick={() => onSelectSpecsHandler(index)}
                              className={`select-part-button-item bg-primary ${index === dropsSelected && "select-part-button-item-active"}`}> Item {index + 1}
                      </button>
                    ))
                  }
                </div>
              </Col>
            </Row>
            <Row className="editor-top-container">
              <Col lg={6} md={6} sm={12} className="editor-item">
                <EditorTitle title={"Drop's Title"}/>
                <EditorComp newValue={setDropsTitleInput}
                            content={dropsContent.dropsData[dropsSelected]?.title || ""}/>
              </Col>
              <Col lg={6} md={6} sm={12} className="editor-item">
                <EditorTitle title={"Drop's Content"}/>
                <EditorComp newValue={setDropsContentInput}
                            content={dropsContent.dropsData[dropsSelected]?.content || ""}/>
              </Col>
            </Row>
            <Row className="editor-update-button">
              <div className="update-button-container d-flex justify-content-center align-items-center">
                <Button className="update-btn" onClick={onUpdateBtnClick}
                        disabled={isLoading || typeof (dropsSelected) !== "number" || (!dropsTitleInput && !dropsContentInput)}>{isLoading ? "Updating" : "Update"}</Button>
              </div>
            </Row>
          </>
        )
      }
      <Row>
        <EditorTitle title={"Preview"}/>
        <div style={{backgroundColor: "#281726"}}>
          <MainDrops/>
        </div>
      </Row>
    </Container>
  );
};

export default DropsEditor;