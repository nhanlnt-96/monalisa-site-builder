import React from "react";
import MainHeader from "components/mainHeader/MainHeader";
import MainBanner from "components/mainBanner/MainBanner";

const HomeScreen = () => {
  return (
    <>
      <MainHeader/>
      <div className="flex flex-col">
        <MainBanner/>
        {/*<About />*/}
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
