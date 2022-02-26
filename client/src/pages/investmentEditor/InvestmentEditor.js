import React, {useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import EditorTitle from "components/editorTitle/EditorTitle";
import EditorComp from "components/editor/EditorComp";
import MainInvestment from "components/mainInvestment/MainInvestment";
import api from "configs/axios";
import {finishUpdate} from "redux/finishUpdate/finishUpdateAction";
import {getBannerContent} from "redux/bannerContent/bannerContentAction";
import {useDispatch, useSelector} from "react-redux";
import {UploadImg} from "components/uploadImg";
import LoadingComp from "components/loadingComp/LoadingComp";
import {getAboutContent} from "redux/aboutContent/aboutContentAction";

const InvestmentEditor = () => {
  const dispatch = useDispatch();
  const aboutContent = useSelector((state) => state.aboutContent);
  const {
    id,
    content,
    imageName,
    imageUrl,
    bgImageName,
    bgImageUrl
  } = aboutContent.aboutData;
  const [isLoading, setIsLoading] = useState(false);
  const [aboutContentInput, setAboutContentInput] = useState("");
  const [imgInfo, setImgInfo] = useState({
    imgName: "",
    imgUrl: ""
  });
  const [imgBgInfo, setImgBgInfo] = useState({
    imgName: "",
    imgUrl: ""
  });
  const onUpdateBtnClick = async () => {
    setIsLoading(true);
    const response = await api.patch(`/about/update/${id}`, {
      content: aboutContentInput || content,
      imageName: imgInfo.imgName || imageName,
      imageUrl: imgInfo.imgUrl || imageUrl,
      bgImageName: imgBgInfo.imgName || bgImageName,
      bgImageUrl: imgBgInfo.imgUrl || bgImageUrl
    });
    if (response.data.success) {
      setIsLoading(false);
      dispatch(finishUpdate(true));
      setAboutContentInput("");
      setImgInfo({
        imgName: "",
        imgUrl: ""
      });
      setImgBgInfo({
        imgName: "",
        imgUrl: ""
      });
      dispatch(getAboutContent());
    }
  };
  return (
    <Container fluid className="editor-container">
      {
        aboutContent.aboutData.length <= 0 ? (
          <LoadingComp/>
        ) : (
          <>
            <Row className="editor-top-container">
              <Col className="editor-item">
                <EditorTitle title={"Investment's Content"}/>
                <EditorComp newValue={setAboutContentInput} content={aboutContent.aboutData?.content}/>
              </Col>
            </Row>
            <Row className="editor-top-container">
              <Col lg={6} md={6} sm={12} className="editor-item">
                <EditorTitle title={"Image Upload"}/>
                <UploadImg imgFolder={"investment"} imgInfo={imgInfo} setImgInfo={setImgInfo}
                           currentImgName={imageName}
                           currentImgUrl={imageUrl}/>
              </Col>
              <Col lg={6} md={6} sm={12} className="editor-item">
                <EditorTitle title={"Background Image Upload"}/>
                <UploadImg imgFolder={"investment"} imgInfo={imgBgInfo} setImgInfo={setImgBgInfo}
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
        <MainInvestment/>
      </Row>
    </Container>
  );
};

export default InvestmentEditor;