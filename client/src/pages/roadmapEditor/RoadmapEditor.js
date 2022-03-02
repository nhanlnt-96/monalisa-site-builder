import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import EditorTitle from "components/editorTitle/EditorTitle";
import EditorComp from "components/editor/EditorComp";
import {useDispatch, useSelector} from "react-redux";
import api from "configs/axios";
import {finishUpdate, finishUploadImg} from "redux/finishUpdate/finishUpdateAction";
import MainRoadmap from "components/mainRoadmap/MainRoadmap";
import {getRoadmapContent} from "redux/roadmapContent/roadmapContentAction";
import LoadingComp from "components/loadingComp/LoadingComp";
import {UploadImg} from "components/uploadImg";

const RoadmapEditor = () => {
  const dispatch = useDispatch();
  const roadmapContent = useSelector((state) => state.roadmapContent);
  const finishedUpdate = useSelector((state) => state.finishUpdate);
  const [isLoading, setIsLoading] = useState(false);
  const [phaseEditSelected, setPhaseEditSelected] = useState(null);
  const [roadmapTitle, setRoadmapTitle] = useState("");
  const [roadmapDescription, setRoadmapDescription] = useState("");
  const [roadmapPhase, setRoadmapPhase] = useState("");
  const [roadmapPhaseDesc, setRoadmapPhaseDesc] = useState("");
  const [imgInfo, setImgInfo] = useState({
    imageName: "",
    imageUrl: ""
  });
  const [isDeletedImg, setIsDeletedImg] = useState(false);
  const onSelectPhaseHandler = (index) => {
    setPhaseEditSelected(index);
  };
  const updateRoadmapGeneral = async () => {
    return await api.patch(`/roadmap/update/general/${roadmapContent.roadmapData.roadmapGeneral.id}`, {
      title: roadmapTitle || roadmapContent.roadmapData.roadmapGeneral.title,
      description: roadmapDescription || roadmapContent.roadmapData.roadmapGeneral.description
    });
  };
  const resetState = () => {
    setIsLoading(false);
    dispatch(finishUpdate(true));
    setRoadmapTitle("");
    setRoadmapDescription("");
    setRoadmapPhase("");
    setRoadmapPhaseDesc("");
    setImgInfo({
      imageName: "",
      imageUrl: ""
    });
    setIsDeletedImg(false);
    dispatch(getRoadmapContent());
  };
  const onUpdateBtnClick = async () => {
    setIsLoading(true);
    try {
      const roadmapContentGeneralRes = await updateRoadmapGeneral();
      const roadmapContentDetailRes = await api.patch(`/roadmap/update/detail/${roadmapContent.roadmapData.roadmapDetail[phaseEditSelected].id}`, {
        phase: roadmapPhase || roadmapContent.roadmapData?.roadmapDetail[phaseEditSelected]?.phase,
        phaseDesc: roadmapPhaseDesc || roadmapContent.roadmapData?.roadmapDetail[phaseEditSelected]?.phaseDesc,
        imageName: isDeletedImg ? imgInfo.imageName : (imgInfo.imageName || roadmapContent.roadmapData?.roadmapDetail[phaseEditSelected]?.imageName),
        imageUrl: isDeletedImg ? imgInfo.imageUrl : (imgInfo.imageUrl || roadmapContent.roadmapData?.roadmapDetail[phaseEditSelected]?.imageUrl)
      });
      if (roadmapContentGeneralRes.data.success && roadmapContentDetailRes.data.success) {
        resetState();
        dispatch(finishUploadImg());
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  return (
    <Container fluid className="editor-container">
      {
        roadmapContent.roadmapData.length === 0 ? (
          <LoadingComp/>
        ) : (
          <>
            <Row className="editor-top-container">
              <Col className="editor-item d-flex flex-column justify-content-center align-items-center">
                <EditorTitle title={(phaseEditSelected === null) ? "Select phase to edit" : `Editing phase ${phaseEditSelected + 1}`}/>
                <div className="select-part-button-container">
                  {
                    roadmapContent.roadmapData?.roadmapDetail?.map((val, index) => (
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
                            content={roadmapContent.roadmapData?.roadmapGeneral?.title || ""}/>
              </Col>
              <Col className="editor-item">
                <EditorTitle title={"Roadmap's Description"}/>
                <EditorComp newValue={setRoadmapDescription}
                            content={roadmapContent.roadmapData?.roadmapGeneral?.description || ""}/>
              </Col>
            </Row>
            <Row className="editor-top-container">
              <Col className="editor-item">
                <EditorTitle title={"Roadmap's No. Phase"}/>
                <EditorComp newValue={setRoadmapPhase}
                            content={roadmapContent.roadmapData?.roadmapDetail[phaseEditSelected]?.phase || ""}/>
              </Col>
              <Col className="editor-item">
                <EditorTitle title={"Roadmap's Phase description"}/>
                <EditorComp newValue={setRoadmapPhaseDesc}
                            content={roadmapContent.roadmapData?.roadmapDetail[phaseEditSelected]?.phaseDesc || ""}/>
              </Col>
            </Row>
            <Row className="editor-top-container">
              <Col className="editor-item">
                <EditorTitle title={(roadmapContent.roadmapData?.roadmapDetail[phaseEditSelected]?.imageUrl || finishedUpdate.isFinishUpdate) ? "Images uploaded" : imgInfo.imageUrl ? "Images Preview" : "Images uploaded"}/>
                <UploadImg imgFolder={"roadmap"}
                           imgInfo={imgInfo}
                           setImgInfo={setImgInfo}
                           currentImgName={roadmapContent.roadmapData?.roadmapDetail[phaseEditSelected]?.imageName}
                           currentImgUrl={roadmapContent.roadmapData?.roadmapDetail[phaseEditSelected]?.imageUrl}
                           isAllowDeleteImg={true} isDeletedImg={isDeletedImg} setIsDeletedImg={setIsDeletedImg}/>
              </Col>
            </Row>
            <Row className="editor-update-button">
              <div className="update-button-container d-flex justify-content-center align-items-center">
                <Button className="update-btn" onClick={onUpdateBtnClick}
                        disabled={isLoading || (!roadmapTitle && !roadmapDescription && !roadmapPhase && !roadmapPhaseDesc && (!isDeletedImg && !imgInfo.imageUrl))}>{isLoading ? "Updating" : "Update"}</Button>
              </div>
            </Row>
          </>
        )
      }
      <Row>
        <EditorTitle title={"Preview"}/>
        <div style={{backgroundColor: "#281726"}}>
          <MainRoadmap/>
        </div>
      </Row>
    </Container>
  );
};

export default RoadmapEditor;