import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import api from "configs/axios";
import {finishUpdate, finishUploadImg} from "redux/finishUpdate/finishUpdateAction";
import {getSpotContent} from "redux/spotContent/spotContentAction";
import {Button, Col, Container, Row} from "react-bootstrap";
import LoadingComp from "components/loadingComp/LoadingComp";
import EditorTitle from "components/editorTitle/EditorTitle";
import MainSpot from "components/mainSpot/MainSpot";
import EditorComp from "components/editor/EditorComp";
import {UploadImg} from "components/uploadImg";

const SpotEditor = () => {
  const dispatch = useDispatch();
  const spotContent = useSelector((state) => state.spotContent);
  const finishedUpdate = useSelector((state) => state.finishUpdate);
  const [isLoading, setIsLoading] = useState(false);
  const [spotSelected, setSpotSelected] = useState(null);
  const [spotDesc, setSpotDesc] = useState("");
  const [imgInfo, setImgInfo] = useState({
    imageName: "",
    imageUrl: ""
  });
  const [isDeletedImg, setIsDeletedImg] = useState(false);
  const onSelectSpotHandler = (index) => {
    setSpotSelected(index);
  };
  const onRefreshPreview = () => {
    dispatch(getSpotContent());
  };
  const resetState = () => {
    setIsLoading(false);
    dispatch(finishUpdate(true));
    setSpotDesc("");
    setImgInfo({
      imageName: "",
      imageUrl: ""
    });
    setIsDeletedImg(false);
    dispatch(getSpotContent());
  };
  const updateSpot = async () => {
    return await api.patch(`/spot/update/${spotContent.spotData[spotSelected]?.id}`, {
      description: spotDesc || spotContent.spotData[spotSelected].description,
      imageName: isDeletedImg ? imgInfo.imageName : (imgInfo.imageName || spotContent.spotData[spotSelected]?.imageName),
      imageUrl: isDeletedImg ? imgInfo.imageUrl : (imgInfo.imageUrl || spotContent.spotData[spotSelected]?.imageUrl)
    });
  };
  const onUpdateBtnClick = async () => {
    setIsLoading(true);
    try {
      const response = await updateSpot();
      if (response.data.success) {
        setIsLoading(false);
        onRefreshPreview();
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
        spotContent.spotData.length <= 0 ? (
          <LoadingComp/>
        ) : (
          <>
            <Row className="editor-top-container">
              <Col className="editor-item d-flex flex-column justify-content-center align-items-center">
                <EditorTitle title={(spotSelected === null) ? "Select Spot's item to edit" : `Editing Spot item ${spotSelected + 1}`}/>
                <div className="select-part-button-container">
                  {
                    spotContent.spotData?.map((val, index) => (
                      <button key={index} onClick={() => onSelectSpotHandler(index)}
                              className={`select-part-button-item bg-primary ${index === spotSelected && "select-part-button-item-active"}`}> Item {index + 1}
                      </button>
                    ))
                  }
                </div>
              </Col>
            </Row>
            <Row className="editor-top-container">
              <Col className="editor-item">
                <EditorTitle title={"Spot's Description"}/>
                <EditorComp newValue={setSpotDesc}
                            content={spotContent.spotData[spotSelected]?.description || ""}/>
              </Col>
              <Col className="editor-item">
                <EditorTitle title={(spotContent.spotData[spotSelected]?.imageUrl || finishedUpdate.isFinishUpdate) ? "Images uploaded" : imgInfo.imageUrl ? "Images Preview" : "Images uploaded"}/>
                <UploadImg imgFolder={"spot"}
                           imgInfo={imgInfo}
                           setImgInfo={setImgInfo}
                           currentImgName={spotContent.spotData[spotSelected]?.imageName}
                           currentImgUrl={spotContent.spotData[spotSelected]?.imageUrl}
                           isAllowDeleteImg={false} isDeletedImg={isDeletedImg} setIsDeletedImg={setIsDeletedImg}/>
              </Col>
            </Row>
            <Row className="editor-update-button">
              <div className="update-button-container d-flex justify-content-center align-items-center">
                <Button className="update-btn" onClick={onUpdateBtnClick}
                        disabled={isLoading || typeof (spotSelected) !== "number" || (!spotDesc && (!isDeletedImg && !imgInfo.imageUrl))}>{isLoading ? "Updating" : "Update"}</Button>
              </div>
            </Row>
          </>
        )
      }
      <Row>
        <EditorTitle title={"Preview"}/>
        <div style={{backgroundColor: "#281726"}}>
          <MainSpot/>
        </div>
      </Row>
    </Container>
  );
};

export default SpotEditor;