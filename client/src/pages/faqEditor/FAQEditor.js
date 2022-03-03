import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import EditorTitle from "components/editorTitle/EditorTitle";
import EditorComp from "components/editor/EditorComp";
import {useDispatch, useSelector} from "react-redux";
import api from "configs/axios";
import {finishUpdate} from "redux/finishUpdate/finishUpdateAction";
import MainFaq from "components/mainFaq/MainFaq";
import {getFaqContent} from "redux/faqContent/faqContentAction";
import LoadingComp from "components/loadingComp/LoadingComp";

const FaqEditor = () => {
  const dispatch = useDispatch();
  const faqContent = useSelector((state) => state.faqContent);
  const [isLoading, setIsLoading] = useState(false);
  const [faqSelected, setFaqSelected] = useState(null);
  const [faqTitle, setFaqTitle] = useState("");
  const [faqSubTitle, setFaqSubTitle] = useState("");
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const onSelectFaqHandler = (index) => {
    setFaqSelected(index);
  };
  const updateFaqGeneral = async () => {
    return await api.patch(`/faq/update/general/${faqContent.faqData?.faqContent?.id}`, {
      title: faqTitle || faqContent.faqData?.faqContent?.title,
      subTitle: faqSubTitle || faqContent.faqData?.faqContent?.subTitle
    });
  };
  const resetState = () => {
    setIsLoading(false);
    dispatch(finishUpdate(true));
    setFaqTitle("");
    setFaqSubTitle("");
    setFaqQuestion("");
    setFaqAnswer("");
    dispatch(getFaqContent());
  };
  const onUpdateBtnClick = async () => {
    setIsLoading(true);
    try {
      if (faqTitle || faqSubTitle) {
        const response = await updateFaqGeneral();
        if (response.data.success) {
          resetState();
        }
      } else {
        const updateFaqGeneralRes = await updateFaqGeneral();
        const updateFaqDetailRes = await api.patch(`faq/update/detail/${faqContent.faqData?.faqDetailContent[faqSelected]?.id}`, {
          question: faqQuestion || faqContent.faqData?.faqDetailContent[faqSelected]?.question,
          answer: faqAnswer || faqContent.faqData?.faqDetailContent[faqSelected]?.answer
        });
        if (updateFaqGeneralRes.data.success && updateFaqDetailRes.data.success) {
          resetState();
        }
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  return (
    <Container fluid className="editor-container">
      {
        faqContent.faqData.length <= 0 ? (
          <LoadingComp/>
        ) : (
          <>
            <Row className="editor-top-container">
              <Col className="editor-item d-flex flex-column justify-content-center align-items-center">
                <EditorTitle title={(faqSelected === null) ? "Select FAQ to edit" : `Editing FAQ ${faqSelected + 1}`}/>
                <div className="select-part-button-container">
                  {
                    faqContent.faqData?.faqDetailContent?.map((val, index) => (
                      <button key={index} onClick={() => onSelectFaqHandler(index)}
                              className={`select-part-button-item bg-primary ${index === faqSelected && "select-part-button-item-active"}`}>FAQ
                        number {index + 1}
                      </button>
                    ))
                  }
                </div>
              </Col>
            </Row>
            <Row className="editor-top-container">
              <Col className="editor-item">
                <EditorTitle title={"FAQ's Title"}/>
                <EditorComp newValue={setFaqTitle}
                            content={faqContent.faqData?.faqContent?.title || ""}/>
              </Col>
              <Col className="editor-item">
                <EditorTitle title={"FAQ's Subtitle"}/>
                <EditorComp newValue={setFaqSubTitle}
                            content={faqContent.faqData?.faqContent?.subTitle || ""}/>
              </Col>
            </Row>
            <Row className="editor-top-container">
              <Col className="editor-item">
                <EditorTitle title={"FAQ's Question"}/>
                <EditorComp newValue={setFaqQuestion}
                            content={faqContent.faqData?.faqDetailContent[faqSelected]?.question || ""}/>
              </Col>
              <Col className="editor-item">
                <EditorTitle title={"FAQ's Answer"}/>
                <EditorComp newValue={setFaqAnswer}
                            content={faqContent.faqData?.faqDetailContent[faqSelected]?.answer || ""}/>
              </Col>
            </Row>
            <Row className="editor-update-button">
              <div className="update-button-container d-flex justify-content-center align-items-center">
                <Button className="update-btn" onClick={onUpdateBtnClick}
                        disabled={isLoading || (faqSelected === null)}>{isLoading ? "Updating" : "Update"}</Button>
              </div>
            </Row>
          </>
        )
      }
      <Row>
        <EditorTitle title={"Preview"}/>
        <div style={{backgroundColor: "#281726"}}>
          <MainFaq/>
        </div>
      </Row>
    </Container>
  );
};

export default FaqEditor;