import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import api from "configs/axios";
import {finishUpdate, finishUploadImg} from "redux/finishUpdate/finishUpdateAction";
import {Button, Col, Container, Row} from "react-bootstrap";
import EditorTitle from "components/editorTitle/EditorTitle";
import {getCollectionsContent} from "redux/collectionsContent/collectionsContentAction";
import MainCollections from "components/mainCollections/MainCollections";
import {UploadMultiImg} from "components/uploadImg";
import EditorComp from "components/editor/EditorComp";

const CollectionsEditor = () => {
  const dispatch = useDispatch();
  const collectionsContent = useSelector((state) => state.collectionsContent);
  const uploadedImgsData = useSelector((state) => state.uploadedImgsData);
  const finishedUpdate = useSelector((state) => state.finishUpdate);
  const [collectionSubTitle, setCollectionSubTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onRefreshPreview = () => {
    dispatch(getCollectionsContent());
  };
  const uploadContentFunc = async () => {
    return await api.patch(`/collections/update/${collectionsContent.collectionsData?.collectionsContent?.id}`, {
      subTitle: collectionSubTitle || collectionsContent.collectionsData?.collectionsContent?.subTitle,
    });
  };
  const resetState = () => {
    setCollectionSubTitle("");
  };
  const onUpdateBtnClick = async () => {
    setIsLoading(true);
    try {
      if (uploadedImgsData.imgsUploadedData.length <= 0) {
        const response = await uploadContentFunc();
        if (response.data.success) {
          setIsLoading(false);
          onRefreshPreview();
          resetState();
          dispatch(finishUploadImg());
        }
      } else {
        const updateContentRes = await uploadContentFunc();
        for (let i = 0; i < uploadedImgsData.imgsUploadedData.length; i++) {
          await api.post("collections/images", {
            imageName: uploadedImgsData.imgsUploadedData[i].imageName,
            imageUrl: uploadedImgsData.imgsUploadedData[i].imageUrl
          });
        }
        if (updateContentRes.data.success) {
          setIsLoading(false);
          onRefreshPreview();
          resetState();
          dispatch(finishUploadImg());
        }
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  return (
    <Container fluid className="editor-container">
      <Row className="editor-top-container">
        <Col lg={6} md={6} sm={12} className="editor-item">
          <EditorTitle title={"Collections's description"}/>
          <EditorComp newValue={setCollectionSubTitle}
                      content={collectionsContent.collectionsData?.collectionsContent?.subTitle || ""}/>
        </Col>
        <Col lg={6} md={6} sm={12} className="editor-item">
          <EditorTitle title={(uploadedImgsData.imgsUploadedData.length <= 0 || finishedUpdate.isFinishUpdate) ? "Images uploaded" : "Images Preview"}/>
          <UploadMultiImg imgFolder={"collections"}
                          currentImg={collectionsContent.collectionsData?.collectionsImgContent}
                          uploadFor={"collections"}/>
        </Col>
      </Row>
      <Row className="editor-update-button">
        <div className="update-button-container d-flex justify-content-center align-items-center">
          <Button className="update-btn" onClick={onUpdateBtnClick}
                  disabled={isLoading || (uploadedImgsData.imgsUploadedData.length <= 0 && !collectionSubTitle)}>{isLoading ? "Updating" : "Update"}</Button>
        </div>
      </Row>
      <Row>
        <EditorTitle title={"Preview"}/>
        <MainCollections/>
      </Row>
    </Container>
  );
};

export default CollectionsEditor;