import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import MainHeader from "components/mainHeader/MainHeader";
import RightImg from "assets/imgs/banner/rightImg.png";
import ScrollDownComp from "components/ScrollDownComp/ScrollDownComp";
import {useDispatch, useSelector} from "react-redux";
import MintBoxComp from "components/mintBox/MintBoxComp";
import {connect} from "redux/blockchain/blockchainActions";
import {fetchData} from "redux/data/dataActions";

import "./MainBanner.scss";
import ToastNoti from "components/mainBanner/component/ToastNoti";
import {getBannerContent} from "redux/bannerContent/bannerContentAction";
import LoadingComp from "components/loadingComp/LoadingComp";

const MainBanner = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const bannerContent = useSelector((state) => state.bannerContent);
  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };
  useEffect(() => {
    dispatch(getBannerContent());
  }, []);
  return bannerContent.isLoading ? (
    <LoadingComp/>
  ) : (
    <Container fluid className="main-banner" style={{backgroundImage: bannerContent.bannerData?.bgImageUrl}}>
      <MainHeader/>
      <Row className="main-banner-content">
        <Col lg={7} md={12} className="main-banner-left">
          <Container
            className="d-flex flex-column justify-content-center align-items-center main-banner-left__container">
            <div className="fw-bold text-center text-center main-banner-title"
                 dangerouslySetInnerHTML={{__html: bannerContent.bannerData?.title}}/>
            <div className="fw-bold text-center main-banner-subtitle"
                 dangerouslySetInnerHTML={{__html: bannerContent.bannerData?.subTitle}}/>
            <div className="text-center main-banner-description"
                 dangerouslySetInnerHTML={{__html: bannerContent.bannerData?.content}}/>
            <div className="main-banner-button">
              {
                !blockchain.account && <button onClick={(e) => {
                  e.preventDefault();
                  dispatch(connect());
                  getData();
                }} className="button-item" dangerouslySetInnerHTML={{__html: bannerContent.bannerData?.connectBtnName}}/>
              }
            </div>
          </Container>
        </Col>
        <Col lg={5} md={12} className="main-banner-right" style={{display: `${blockchain.account && "flex"}`}}>
          {
            blockchain.account ? (
              <MintBoxComp/>
            ) : (
              bannerContent.bannerData?.imageUrl && (
                <img src={bannerContent.bannerData?.imageUrl} alt="liberT-img"/>
              )
            )
          }
        </Col>
      </Row>
      <ScrollDownComp/>
      <ToastNoti errorMsg={blockchain.errorMsg}/>
    </Container>
  );
};

export default MainBanner;