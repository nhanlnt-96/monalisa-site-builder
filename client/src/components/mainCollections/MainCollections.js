import React, {useEffect} from "react";
import {Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import LoadingComp from "components/loadingComp/LoadingComp";
import {getCollectionsContent} from "redux/collectionsContent/collectionsContentAction";

const MainCollections = () => {
  const dispatch = useDispatch();
  const collectionsContent = useSelector((state) => state.collectionsContent);
  useEffect(() => {
    dispatch(getCollectionsContent());
  }, []);
  return collectionsContent.isLoading ? (
    <LoadingComp/>
  ) : (
    <Container className="slideshow-comp" fluid>
      <div className="title-container">
      </div>
      <div className="slideshow-comp-slider">
        <div className="slideshow-comp-track"
             style={{width: `calc(250px * ${collectionsContent.collectionsData.length * 2})`}}>
          {
            collectionsContent.collectionsData.map((val, index) => (
              <div key={index} className="slideshow-comp-slide">
                <img src={val.imageUrl} alt="liberT"/>
              </div>
            ))
          }
          {
            collectionsContent.collectionsData.map((val, index) => (
              <div key={index} className="slideshow-comp-slide">
                <img src={val.imageUrl} alt="liberT"/>
              </div>
            ))
          }
        </div>
      </div>
    </Container>
  );
};

export default MainCollections;