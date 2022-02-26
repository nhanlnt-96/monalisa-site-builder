import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Row} from "react-bootstrap";
import PrimaryTitle from "components/primaryTitle/PrimaryTitle";
import ScrollDownComp from "components/ScrollDownComp/ScrollDownComp";
import {roadmapData} from "configs/roadmapData";
import {getRoadmapContent} from "redux/roadmapContent/roadmapContentAction";

import "./MainRoadmap.scss";
import LoadingComp from "components/loadingComp/LoadingComp";

const MainRoadmap = () => {
  const dispatch = useDispatch();
  const roadmapContent = useSelector((state) => state.roadmapContent);
  useEffect(() => {
    dispatch(getRoadmapContent());
  }, []);
  return roadmapContent.isLoading ? (
    <LoadingComp/>
  ) : (
    <Container fluid className="main-container-height main-roadmap">
      <PrimaryTitle title={"roadmap"}/>
      <Container className="main-roadmap-container">
        <Row
          className="main-content-height main-roadmap-content d-flex flex-column justify-content-center align-items-center">
          {
            roadmapContent.roadmapData?.map((val, index) => (
              <div key={index} className="main-roadmap-item">
                <div className="item-title" dangerouslySetInnerHTML={{__html: val.title}}/>
                <div className="item-desc" dangerouslySetInnerHTML={{__html: val.description}}/>
              </div>
            ))
          }
        </Row>
      </Container>
      <ScrollDownComp/>
    </Container>
  );
};

export default MainRoadmap;