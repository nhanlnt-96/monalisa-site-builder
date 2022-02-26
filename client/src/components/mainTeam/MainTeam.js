import React, {useEffect} from "react";
import {Container, Row} from "react-bootstrap";
import PrimaryTitle from "components/primaryTitle/PrimaryTitle";
import {useDispatch, useSelector} from "react-redux";
import {getTeamContent} from "redux/teamContent/teamContentAction";

import "./MainTeam.scss";

const MainTeam = () => {
  const dispatch = useDispatch();
  const teamContent = useSelector((state) => state.teamContent);
  useEffect(() => {
    dispatch(getTeamContent());
  }, []);
  return (
    <Container fluid className="main-container-height main-team">
      <PrimaryTitle title={"team"}/>
      <Container className="main-team-container">
        <Row
          className="main-content-height main-team-content d-flex flex-column justify-content-center align-items-center">
          {
            teamContent.teamData.map((val, index) => (
              <div key={index} className="item-container">
                <div className="member-info d-flex flex-column justify-content-center align-items-center">
                  {
                    val.imageUrl && (
                      <div className="member-ava d-flex justify-content-center align-items-center">
                        <img src={val.imageUrl} alt={`${val.name}-ava`}/>
                      </div>
                    )
                  }
                  <div className="member-name" dangerouslySetInnerHTML={{__html: val.name}}/>
                  <div className="member-position" dangerouslySetInnerHTML={{__html: val.position}}/>
                </div>
              </div>
            ))
          }
        </Row>
      </Container>
    </Container>
  );
};

export default MainTeam;