import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAboutContent} from "redux/aboutContent/aboutContentAction";
import LoadingComp from "components/loadingComp/LoadingComp";

const MainAbout = () => {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const aboutContent = useSelector((state) => state.aboutContent);
  useEffect(() => {
    dispatch(getAboutContent());
  }, []);
  return (aboutContent.isLoading ? (
      <LoadingComp/>
    ) : (
      <>
        <div
          className="about mt-10 mx-auto max-w-7xl px-4 sm:px-0 sm:mt-24"
          id="about"
        >
          <div className="grid sm:grid-cols-12 items-center">
            <div
              className="row-start-1 sm:row-start-auto sm:pl-16 sm:text-left md:col-span-12 lg:col-span-6 p-0 lg:p-0"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              {/* <p className='label-title'>
              About
              <span className='hidden sm:block label-line'></span>
            </p> */}
              <div className="text-3xl sm:text-4xl tracking-wide font-bold mb-4 space-y-1 sm:space-y-2 about-title"
                   dangerouslySetInnerHTML={{__html: aboutContent.aboutData[0]?.title}}>
              </div>
              <div className="text-sm sm:text-lg text-gray font-normal mt-10">
                <div className="bcm leading-relaxed"
                     dangerouslySetInnerHTML={{__html: aboutContent.aboutData[0]?.content}}/>
              </div>
            </div>
            <div
              className="sm:col-start-auto sm:max-w-lg sm:mx-auto md:col-span-12 md:mt-6 lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <div className="flex-shrink-0 w-full">
                <div className="grid gap-2 sm:gap-5 grid-cols-2 ">
                  {
                    aboutContent.aboutData[0]?.AboutImgs.map((val, index) => (
                      <div key={index} className="grid__image">
                        <img src={val.imageUrl} alt={val.imageName}/>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          <div
            id="whyus"
            className="mt-10 mx-auto max-w-7xl px-4 sm:px-0 sm:mt-24 lg:mt-32"
          >
            <div className="grid sm:grid-cols-12 items-center">
              <div className="mt-5 sm:max-w-lg sm:mx-auto md:col-span-12  lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <div className="flex-shrink-0 w-full">
                  <div className="grid gap-2 sm:gap-4">
                    {
                      aboutContent.aboutData[1]?.AboutImgs.map((val, index) => (
                        <div key={index}>
                          <img
                            src={val.imageUrl}
                            alt={val.imageName}
                            data-aos="fade-right"
                            data-aos-duration="600"
                          />
                        </div>
                      ))
                    }
                  
                  </div>
                </div>
              </div>
              
              <div className="sm:pl-16 sm:text-left md:col-span-12  lg:col-span-6">
                {/* <p className='label-title'>
                Features
                <span className='hidden sm:block label-line'></span>
              </p> */}
                <div className="text-3xl sm:text-4xl tracking-wide font-bold mb-4 space-y-1 sm:space-y-2 about-title"
                     dangerouslySetInnerHTML={{__html: aboutContent.aboutData[1]?.title}}/>
                <div
                  className="text-sm sm:text-lg text-gray font-normal mt-10"
                  data-aos="fade-up"
                  data-aos-duration="600"
                >
                  <div className={`bcm leading-relaxed truncate-text ${showMore && "un-truncate"}`}
                       dangerouslySetInnerHTML={{__html: aboutContent.aboutData[1]?.content}}/>
                  <div className="read-more-btn">
                    <button
                      onClick={(e) => setShowMore(!showMore)}
                      className="text-primary"
                    >
                      {showMore ? "Read less" : "Read more"}
                    </button>
                  </div>
                  <div className="flex flex-row flex-wrap gap-2 sm:gap-4 mt-5 sm:mt-10">
                    <button className="flex space-x-6 items-center justify-between sm:border-b sm:border-opacity-60 sm:border-default py-2">
                      <a
                        href="https://discord.gg/B94Tc69PV6"
                        target="_blank"
                        className="text-default"
                      >
                        Join Us
                      </a>
                      {" "}
                      <svg
                        className="text-primary w-4"
                        viewBox="0 0 20 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 7.4979V6.4979C0 6.22176 0.223858 5.9979 0.5 5.9979H16.67L12.22 1.5579C12.1253 1.46402 12.0721 1.33622 12.0721 1.2029C12.0721 1.06958 12.1253 0.941782 12.22 0.847899L12.93 0.147899C13.0239 0.0532428 13.1517 0 13.285 0C13.4183 0 13.5461 0.0532428 13.64 0.147899L19.78 6.2779C19.9207 6.41842 19.9998 6.60905 20 6.8079V7.1879C19.9977 7.38631 19.9189 7.57618 19.78 7.7179L13.64 13.8479C13.5461 13.9426 13.4183 13.9958 13.285 13.9958C13.1517 13.9958 13.0239 13.9426 12.93 13.8479L12.22 13.1379C12.1259 13.0457 12.0729 12.9196 12.0729 12.7879C12.0729 12.6562 12.1259 12.5301 12.22 12.4379L16.67 7.9979H0.5C0.223858 7.9979 0 7.77404 0 7.4979Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default MainAbout;