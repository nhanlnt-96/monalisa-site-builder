import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import LoadingComp from "components/loadingComp/LoadingComp";
import {getSpotContent} from "redux/spotContent/spotContentAction";

const MainSpot = () => {
  const dispatch = useDispatch();
  const spotContent = useSelector((state) => state.spotContent);
  useEffect(() => {
    dispatch(getSpotContent());
  }, []);
  return spotContent.isLoading ? (
    <LoadingComp/>
  ) : (
    <section className="mt-10 sm:mt-auto py-6 sm:py-20 text-center">
      <h2 className="text-primary uppercase text-lg font-semibold mb-6">
        Get Your Spot now
      </h2>
      <div className="mt-0 mx-auto max-w-7xl px-4 sm:mt-0 sm:px-0 pb-10 sm:pb-14 text-center">
        <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-4">
          {
            spotContent.spotData?.map((val, index) => (
              <div key={index} className="spot__image">
                <img src={val.imageUrl} alt={val.imageName} className="max-w-full"/>
                <div className="text-sm font-bold py-4 px-2 text-left text-default"
                     dangerouslySetInnerHTML={{__html: val.description}}/>
              </div>
            ))
          }
        </div>
      </div>
      <div className="container flex flex-row justify-center flex-wrap gap-4 mx-auto">
        <div className="inline-block btn-gradient p-0.5 btn-animate max-w-max ">
          <a
            target="_blank"
            className="uppercase text-default font-bold text-sm tracking-wider h-14 px-8 flex justify-center items-center btn-bg-gradient focus:outline-none"
            href="https://discord.gg/KbEtpY4EVS"
          >
            <span>Let's Start</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MainSpot;