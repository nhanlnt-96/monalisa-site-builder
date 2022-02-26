import React, {useEffect} from "react";
import {Container, Row} from "react-bootstrap";
import PrimaryTitle from "components/primaryTitle/PrimaryTitle";
import {Section1, Section2} from "components/mainHowItWork/components";
import ScrollDownComp from "components/ScrollDownComp/ScrollDownComp";

import "./MainHowItWorks.scss";
import {useDispatch, useSelector} from "react-redux";
import {getHowWorkContent} from "redux/howWorkContent/howWorkContentAction";
import LoadingComp from "components/loadingComp/LoadingComp";

const MainHowItWorks = () => {
  const dispatch = useDispatch();
  const howWorkContent = useSelector((state) => state.howWorkContent);
  useEffect(() => {
    dispatch(getHowWorkContent());
  }, []);
  return howWorkContent.isLoading ? (
    <LoadingComp/>
  ) : (
    <Container fluid className="main-container-height main-how">
      <PrimaryTitle title={"how it works"}/>
      <div className="main-how-subtitle">
        <PrimaryTitle title={"solidarity - movement - change"}/>
      </div>
      <Container>
        <div className="main-how-section__1">
          <Section1 data={howWorkContent.howWorkData[0]}/>
        </div>
        <div className="scroll-down">
          <ScrollDownComp/>
        </div>
        <div className="main-how-section__2">
          <Section2 data={howWorkContent.howWorkData[1]}/>
        </div>
        <div className="scroll-down" style={{marginBottom: 0}}>
          <ScrollDownComp/>
        </div>
      </Container>
    </Container>
  );
};

export default MainHowItWorks;