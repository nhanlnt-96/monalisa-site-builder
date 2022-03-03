import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTeamContent} from "redux/teamContent/teamContentAction";
import teamImage1 from "assets/imgs/team/1.jpeg";
import teamImage2 from "assets/imgs/team/2.jpeg";
import teamImage3 from "assets/imgs/team/3.jpeg";
import teamImage4 from "assets/imgs/team/4.jpeg";
import LoadingComp from "components/loadingComp/LoadingComp";

const MainTeam = () => {
  const dispatch = useDispatch();
  const teamContent = useSelector((state) => state.teamContent);
  useEffect(() => {
    dispatch(getTeamContent());
  }, []);
  return teamContent.isLoading ? (
    <LoadingComp/>
  ) : (
    <section className="bg-gray-section" id="team">
      <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-0 text-center">
        <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
          <h2 className="text-primary sm:text-center text-2xl sm:text-4xl tracking-wide leading-normal font-bold mb-6 sm:mb-10 uppercase">
            our team
          </h2>
          {/* <div className='bcm text-gray text-sm sm:text-base sm:w-7/12 px-6 mx-auto'></div> */}
        </div>
      </div>
      
      <div className="mt-0 mx-auto max-w-7xl px-4 sm:mt-0 sm:px-0 pb-10 sm:pb-14 text-center">
        <ul className="grid grid-cols-2 gap-2 sm:gap-6 gap-y-6 sm:space-y-0 lg:grid-cols-4 lg:gap-5 lg:gap-y-14 mt-10">
          {
            teamContent.teamData?.map((val, index) => (
              <li key={index}
                  className="text-center xl:text-left"
                  data-aos="zoom-in"
                  data-aos-duration="1000"
              >
                <div className="space-y-3 xl:space-y-4">
                  <img src={val.imageUrl} alt={val.imageName}/>
                  <div className="space-y-2 xl:flex xl:justify-between">
                    <div className="font-medium text-lg leading-6 space-y-1">
                      <div className="text-white uppercase text-sm sm:text-xl font-bold text-default"
                           dangerouslySetInnerHTML={{__html: val.name}}/>
                    </div>
                    <ul className="flex justify-center space-x-2 sm:space-x-2">
                      <li>
                        <a
                          href={val.socialUrl}
                          className="block p-1 bg-white rounded-full hover:ring-2 hover:ring-primary"
                        >
                          <span className="sr-only">Instagram</span>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 448 512"
                            className="text-black w-4 h-4"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  );
};

export default MainTeam;