import React from "react";
import MainHeader from "components/mainHeader/MainHeader";
import MainBanner from "components/mainBanner/MainBanner";
import MainAbout from "components/mainAbout/MainAbout";
import MainRoadmap from "components/mainRoadmap/MainRoadmap";

const HomeScreen = () => {
  return (
    <>
      <MainHeader/>
      <div className="flex flex-col">
        <MainBanner/>
        <MainAbout/>
        <MainRoadmap/>
        {/*<JoinDiscord />*/}
        {/*<GoldenGuest />*/}
        {/*<Feature />*/}
        {/*<Team />*/}
        {/*<Faq />*/}
        {/*<Footer />*/}
      </div>
    </>
  );
};

export default HomeScreen;
