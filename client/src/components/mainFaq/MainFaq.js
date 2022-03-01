import React, {useEffect} from "react";
import {Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getFaqContent} from "redux/faqContent/faqContentAction";
import LoadingComp from "components/loadingComp/LoadingComp";

const MainFaq = () => {
  const dispatch = useDispatch();
  const faqContent = useSelector((state) => state.faqContent);
  useEffect(() => {
    dispatch(getFaqContent());
  }, []);
  return faqContent.isLoading ? (
    <LoadingComp/>
  ) : (
    <Container fluid className="main-container-height main-faq">
      <Container className="main-faq-container">
        <Row className="main-content-height main-faq-content">
          {
            faqContent.faqData.map((val, index) => (
              <div key={index} className="faq-item-container">
                <div className="question d-flex justify-content-start">
                  <div className="question-container">
                    <div className="question-desc" dangerouslySetInnerHTML={{__html: val.question}}/>
                  </div>
                </div>
                <div className="answer d-flex justify-content-end">
                  <div className="answer-container">
                    <div className="answer-desc" dangerouslySetInnerHTML={{__html: val.answer}}/>
                  </div>
                </div>
              </div>
            ))
          }
        </Row>
      </Container>
    </Container>
  );
};

export default MainFaq;