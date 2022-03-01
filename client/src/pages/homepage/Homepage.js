import React from "react";
import MainHeader from "components/mainHeader/MainHeader";
import MainBanner from "components/mainBanner/MainBanner";
import MainAbout from "components/mainAbout/MainAbout";

const HomeScreen = () => {
  return (
    <>
      <MainHeader/>
      <div className="flex flex-col">
        <MainBanner/>
        <MainAbout/>
        {/*<Roadmap />*/}
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
