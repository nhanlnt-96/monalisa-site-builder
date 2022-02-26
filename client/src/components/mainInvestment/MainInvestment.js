import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import PrimaryTitle from "components/primaryTitle/PrimaryTitle";
import ScrollDownComp from "components/ScrollDownComp/ScrollDownComp";
import LeftSideImg from "assets/shapes/investmentLeftSide.png";
import {useDispatch, useSelector} from "react-redux";
import {getAboutContent} from "redux/aboutContent/aboutContentAction";
import LoadingComp from "components/loadingComp/LoadingComp";

import "./MainInvestment.scss";

const MainInvestment = () => {
  const dispatch = useDispatch();
  const aboutContent = useSelector((state) => state.aboutContent);
  useEffect(() => {
    dispatch(getAboutContent());
  }, []);
  return aboutContent.isLoading ? (
    <LoadingComp/>
  ) : (
    <Container fluid className="main-container-height main-investment"
               style={{backgroundImage: aboutContent.bannerData?.bgImageUrl}}>
      <PrimaryTitle title={"investment summary"}/>
      {
        !aboutContent.bannerData?.bgImageUrl && (
          <img src={LeftSideImg} alt="liberT" className="left-side-img"/>
        )
      }
      <Container className="main-investment-container">
        <Row className="main-content-height main-investment-content">
          <Col lg={7} md={7} className="main-investment-left d-flex align-items-center">
            <div className="main-investment-description"
                 dangerouslySetInnerHTML={{__html: aboutContent.aboutData?.content}}/>
          </Col>
          <Col lg={5} md={5} className="main-investment-right d-flex justify-content-center align-items-center">
            {
              aboutContent.aboutData?.imageUrl && (
                <img src={aboutContent.aboutData?.imageUrl} alt="liberT-investment"/>
              )
            }
          </Col>
        </Row>
      </Container>
      <ScrollDownComp/>
    </Container>
  );
};

export default MainInvestment;