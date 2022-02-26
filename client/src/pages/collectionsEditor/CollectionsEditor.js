import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import api from "configs/axios";
import {finishUpdate} from "redux/finishUpdate/finishUpdateAction";
import {Button, Col, Container, Row} from "react-bootstrap";
import EditorTitle from "components/editorTitle/EditorTitle";
import {getCollectionsContent} from "redux/collectionsContent/collectionsContentAction";
import MainCollections from "components/mainCollections/MainCollections";
import {UploadMultiImg} from "components/uploadImg";

const CollectionsEditor = () => {
  const dispatch = useDispatch();
  const collectionsContent = useSelector((state) => state.collectionsContent);
  const uploadedImgsData = useSelector((state) => state.uploadedImgsData);
  const [isLoading, setIsLoading] = useState(false);
  const [imgInfo, setImgInfo] = useState([]);
  const onUpdateBtnClick = async () => {
    setIsLoading(true);
    for (let i = 0; i < uploadedImgsData.imgsUploadedData.length; i++) {
      await api.post("collections", {
        imageName: uploadedImgsData.imgsUploadedData[i].imgName,
        imageUrl: uploadedImgsData.imgsUploadedData[i].imgUrl
      });
    }
    setIsLoading(false);
    dispatch(finishUpdate(true));
    setImgInfo([]);
    dispatch(getCollectionsContent());
  };
  console.log(imgInfo)
  return (
    <Container fluid className="editor-container">
      <Row className="editor-top-container">
        <Col lg={12} md={12} sm={12} className="editor-item">
          <EditorTitle title={"Image Upload"}/>
          <UploadMultiImg imgFolder={"collections"} imgData={imgInfo} setImgData={setImgInfo}
                          currentImg={collectionsContent.collectionsData}/>
        </Col>
      </Row>
      <Row className="editor-update-button">
        <div className="update-button-container d-flex justify-content-center align-items-center">
          <Button className="update-btn" onClick={onUpdateBtnClick}
                  disabled={isLoading || uploadedImgsData.imgsUploadedData.length <= 0}>{isLoading ? "Updating" : "Update"}</Button>
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