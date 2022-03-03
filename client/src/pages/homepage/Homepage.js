import React from "react";
import MainHeader from "components/mainHeader/MainHeader";
import MainBanner from "components/mainBanner/MainBanner";
import MainAbout from "components/mainAbout/MainAbout";
import MainRoadmap from "components/mainRoadmap/MainRoadmap";
import MainSpot from "components/mainSpot/MainSpot";
import MainCollections from "components/mainCollections/MainCollections";

const HomeScreen = () => {
  return (
    <>
      <MainHeader/>
      <div className="flex flex-col">
        <MainBanner/>
        <MainAbout/>
        <MainRoadmap/>
        <MainSpot/>
        <MainCollections/>
      </div>
    </>
  );
};

export default HomeScreen;
