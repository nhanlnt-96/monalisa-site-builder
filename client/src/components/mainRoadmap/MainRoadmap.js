import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRoadmapContent} from "redux/roadmapContent/roadmapContentAction";
import LoadingComp from "components/loadingComp/LoadingComp";

const MainRoadmap = () => {
  const dispatch = useDispatch();
  const roadmapContent = useSelector((state) => state.roadmapContent);
  useEffect(() => {
    dispatch(getRoadmapContent());
  }, []);
  return (roadmapContent.isLoading ? (
      <LoadingComp/>
    ) : (
      <>
        <section className="roadmap py-12 mt-12" id="roadmap">
          <div className="roadmap__wrapper px-4 text-primary 2xl:px-72 mx-auto md:px-12">
            <div
              className="roadmap__top flex flex-col pt-6"
              data-aos="fade-right"
              data-aos-duration="1200"
            >
              <div className="font-black font-heading text-4xl uppercase py-3 md:text-center lg:text-left 2xl:text-5xl"
                   dangerouslySetInnerHTML={{__html: roadmapContent.roadmapData?.roadmapGeneral?.title}}/>
              <div className="text-base leading-6 md:text-center md:text-lg md:leading-8 md:py-2 lg:text-left text-default 2xl:text-2xl"
                   dangerouslySetInnerHTML={{__html: roadmapContent.roadmapData?.roadmapGeneral?.description}}/>
            </div>
            <div className="main__roadmap">
              {/*<h3 className="font-bold uppercase text-2xl text-btn pt-6">*/}
              {/*  roadmap*/}
              {/*</h3>*/}
              {
                roadmapContent.roadmapData?.roadmapDetail?.map((val, index) => (
                  <div key={index}
                       className="phases__container bg-secondary py-6 px-8 rounded-md mt-10 "
                       data-aos="fade-right"
                       data-aos-duration="2700"
                  >
                    <div className="text-btn font-bold font-body text-4xl 2xl:text-5xl uppercase leading-10 mb-2"
                         dangerouslySetInnerHTML={{__html: val.phase}}/>
                    <div className="flex md:flex-wrap lg:flex-nowrap gap-8 items-center roadmap-custom-wrap">
                      <div className="text-default text-base 2xl:text-2xl "
                           dangerouslySetInnerHTML={{__html: val.phaseDesc}}/>
                      {
                        val.imageUrl && (
                          <img
                            src={val.imageUrl}
                            alt={val.imageName}
                            className="max-w-full lg:w-1/5 rounded-lg"
                          />
                        )
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default MainRoadmap;