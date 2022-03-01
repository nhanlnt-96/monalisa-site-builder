import React, {useState} from "react";
import LoadingComp from "components/loadingComp/LoadingComp";
import {Button, Col, Container, Row} from "react-bootstrap";
import EditorTitle from "components/editorTitle/EditorTitle";
import EditorComp from "components/editor/EditorComp";
import {UploadMultiImg} from "components/uploadImg";
import MainAbout from "components/mainAbout/MainAbout";
import {useDispatch, useSelector} from "react-redux";
import {getAboutContent} from "redux/aboutContent/aboutContentAction";
import api from "configs/axios";
import {finishUpdate, finishUploadImg} from "redux/finishUpdate/finishUpdateAction";

const AboutEditor = () => {
  const dispatch = useDispatch();
  const aboutContent = useSelector((state) => state.aboutContent);
  const uploadedImgsData = useSelector((state) => state.uploadedImgsData);
  const finishedUpdate = useSelector((state) => state.finishUpdate);
  const [isLoading, setIsLoading] = useState(false);
  const [aboutSelected, setAboutSelected] = useState(null);
  const [aboutTitleInput, setAboutTitleInput] = useState("");
  const [aboutContentInput, setAboutContentInput] = useState("");
  const onSelectAboutHandler = (index) => {
    setAboutSelected(index);
  };
  const onRefreshPreview = () => {
    dispatch(getAboutContent());
  };
  const uploadContentFunc = async () => {
    return await api.patch(`/about/update/${aboutContent.aboutData[aboutSelected]?.id}`, {
      title: aboutTitleInput || aboutContent.aboutData[aboutSelected]?.title,
      content: aboutContentInput || aboutContent.aboutData[aboutSelected]?.content,
    });
  };
  const onUpdateBtnClick = async () => {
    setIsLoading(true);
    try {
      if (uploadedImgsData.imgsUploadedData.length <= 0) {
        const response = await uploadContentFunc();
        if (response.data.success) {
          setIsLoading(false);
          onRefreshPreview();
          dispatch(finishUploadImg());
        }
      } else {
        const updateContentRes = await uploadContentFunc();
        const uploadImgRes = await api.post("/about/images", {
          imageArr: uploadedImgsData.imgsUploadedData,
          contentId: aboutContent.aboutData[aboutSelected]?.id
        });
        if (updateContentRes.data.success && uploadImgRes.data.success) {
          setIsLoading(false);
          onRefreshPreview();
          dispatch(finishUploadImg());
        }
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  console.log(uploadedImgsData.imgsUploadedData);
  return (
    <Container fluid className="editor-container">
      {
        aboutContent.aboutData.length <= 0 ? (
          <LoadingComp/>
        ) : (
          <>
            <Row className="editor-top-container">
              <Col className="editor-item d-flex flex-column justify-content-center align-items-center">
                <EditorTitle title={(aboutSelected === null) ? "Select About's part to edit" : `Editing About part ${aboutSelected + 1}`}/>
                <div className="select-part-button-container">
                  {
                    aboutContent.aboutData.map((val, index) => (
                      <button key={index} onClick={() => onSelectAboutHandler(index)}
                              className={`select-part-button-item bg-primary ${index === aboutSelected && "select-part-button-item-active"}`}> Part {index + 1}
                      </button>
                    ))
                  }
                </div>
              </Col>
            </Row>
            <Row className="editor-top-container">
              <Col lg={6} md={6} sm={12} className="editor-item">
                <EditorTitle title={"About's Title"}/>
                <EditorComp newValue={setAboutTitleInput} content={aboutContent.aboutData[aboutSelected]?.title || ""}/>
              </Col>
              <Col lg={6} md={6} sm={12} className="editor-item">
                <EditorTitle title={"About's Content"}/>
                <EditorComp newValue={setAboutContentInput}
                            content={aboutContent.aboutData[aboutSelected]?.content || ""}/>
              </Col>
            </Row>
            <Row className="editor-top-container">
              <Col lg={12} md={12} sm={12} className="editor-item">
                <EditorTitle title={(uploadedImgsData.imgsUploadedData.length <= 0 || finishedUpdate.isFinishUpdate) ? "Images uploaded" : "Images Preview"}/>
                <UploadMultiImg imgFolder={"about"}
                                currentImg={aboutContent.aboutData[aboutSelected]?.AboutImgs}
                                imageLimit={aboutSelected === 0 ? 4 : 1} previewPosition={"center"}/>
              </Col>
            </Row>
            <Row className="editor-update-button">
              <div className="update-button-container d-flex justify-content-center align-items-center">
                <Button className="update-btn" onClick={onUpdateBtnClick}
                        disabled={isLoading || typeof (aboutSelected) !== "number" || (!aboutContentInput && !aboutTitleInput && uploadedImgsData.imgsUploadedData.length <= 0)}>{isLoading ? "Updating" : "Update"}</Button>
              </div>
            </Row>
          </>
        )
      }
      <Row>
        <EditorTitle title={"Preview"}/>
        <div style={{backgroundColor: "#281726"}}>
          <MainAbout/>
        </div>
      </Row>
    </Container>
  );
};

export default AboutEditor;