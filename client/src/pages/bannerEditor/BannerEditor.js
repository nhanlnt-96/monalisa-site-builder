import React, {useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import EditorComp from "components/editor/EditorComp";
import EditorTitle from "components/editorTitle/EditorTitle";
import MainBanner from "components/mainBanner/MainBanner";
import {useDispatch, useSelector} from "react-redux";
import api from "configs/axios";
import {getBannerContent} from "redux/bannerContent/bannerContentAction";
import {finishUpdate} from "redux/finishUpdate/finishUpdateAction";
import {UploadImg} from "components/uploadImg";
import LoadingComp from "components/loadingComp/LoadingComp";

const BannerEditor = () => {
  const dispatch = useDispatch();
  const bannerContent = useSelector((state) => state.bannerContent);
  const {
    id,
    title,
    subTitle,
    content,
    connectBtnName,
    imageName,
    imageUrl,
    bgImageName,
    bgImageUrl
  } = bannerContent.bannerData;
  const [isLoading, setIsLoading] = useState(false);
  const [bannerTitleInput, setBannerTitleInput] = useState("");
  const [bannerSubTitleInput, setBannerSubTitleInput] = useState("");
  const [bannerContentInput, setBannerContentInput] = useState("");
  const [bannerBtnNameInput, setBannerBtnNameInput] = useState("");
  const [imgInfo, setImgInfo] = useState({
    imgName: "",
    imgUrl: ""
  });
  const [imgBgInfo, setImgBgInfo] = useState({
    imgName: "",
    imgUrl: ""
  });
  const onRefreshPreview = () => {
    dispatch(getBannerContent());
  };
  const onUpdateBtnClick = async () => {
    setIsLoading(true);
    const response = await api.patch(`/banner/update/${id}`, {
      title: bannerTitleInput || title,
      subTitle: bannerSubTitleInput || subTitle,
      content: bannerContentInput || content,
      connectBtnName: bannerBtnNameInput || connectBtnName,
      imageName: imgInfo.imgName || imageName,
      imageUrl: imgInfo.imgUrl || imageUrl,
      bgImageName: imgBgInfo.imgName || bgImageName,
      bgImageUrl: imgBgInfo.imgUrl || bgImageUrl
    });
    if (response.data.success) {
      setIsLoading(false);
      dispatch(finishUpdate(true));
      setBannerTitleInput("");
      setBannerSubTitleInput("");
      setBannerContentInput("");
      setBannerBtnNameInput("");
      setImgInfo({
        imgName: "",
        imgUrl: ""
      });
      setImgBgInfo({
        imgName: "",
        imgUrl: ""
      });
      onRefreshPreview();
    }
  };
  
  return (
    <Container fluid className="editor-container">
      {
        bannerContent.bannerData.length <= 0 ? (
          <LoadingComp/>
        ) : (
          <>
            <Row className="editor-top-container">
              <Col lg={6} md={6} sm={12} className="editor-item">
                <EditorTitle title={"Banner's Title"}/>
                <EditorComp newValue={setBannerTitleInput} content={bannerContent.bannerData?.title}/>
              </Col>
              <Col lg={6} md={6} sm={12} className="editor-item">
                <EditorTitle title={"Banner's Subtitle"}/>
                <EditorComp newValue={setBannerSubTitleInput} content={bannerContent.bannerData?.subTitle}/>
              </Col>
            </Row>
            <Row className="editor-top-container">
              <Col lg={6} md={6} sm={12} className="editor-item">
                <EditorTitle title={"Banner's Content"}/>
                <EditorComp newValue={setBannerContentInput} content={bannerContent.bannerData?.content}/>
              </Col>
              <Col lg={6} md={6} sm={12} className="editor-item">
                <EditorTitle title={"Banner's Button Name"}/>
                <EditorComp newValue={setBannerBtnNameInput} content={bannerContent.bannerData?.connectBtnName}/>
              </Col>
            </Row>
            <Row className="editor-top-container">
              <Col lg={6} md={6} sm={12} className="editor-item">
                <EditorTitle title={"Image Upload"}/>
                <UploadImg imgFolder={"banner"} imgInfo={imgInfo} setImgInfo={setImgInfo}
                           currentImgName={imageName}
                           currentImgUrl={imageUrl}/>
              </Col>
              <Col lg={6} md={6} sm={12} className="editor-item">
                <EditorTitle title={"Background Image Upload"}/>
                <UploadImg imgFolder={"banner"} imgInfo={imgBgInfo} setImgInfo={setImgBgInfo}
                           currentImgName={bgImageName}
                           currentImgUrl={bgImageUrl}/>
              </Col>
            </Row>
            <Row className="editor-update-button">
              <div className="update-button-container d-flex justify-content-center align-items-center">
                <Button className="update-btn" onClick={onUpdateBtnClick}
                        disabled={isLoading}>{isLoading ? "Updating" : "Update"}</Button>
              </div>
            </Row>
          </>
        )
      }
      <Row>
        <EditorTitle title={"Preview"}/>
        <MainBanner/>
      </Row>
    </Container>
  );
};

export default BannerEditor;