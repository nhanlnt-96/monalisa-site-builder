import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFaqContent} from "redux/faqContent/faqContentAction";
import LoadingComp from "components/loadingComp/LoadingComp";
import {SingleFaq} from "components/mainFaq/components/SingleFaq";

const MainFaq = () => {
  const dispatch = useDispatch();
  const faqContent = useSelector((state) => state.faqContent);
  useEffect(() => {
    dispatch(getFaqContent());
  }, []);
  return faqContent.isLoading ? (
    <LoadingComp/>
  ) : (
    <section className="mt-10 sm:mt-8" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:mt-24 sm:px-0 lg:mt-4 text-center">
        <div className="text-primary sm:text-center text-xl sm:text-4xl tracking-wide leading-normal font-bold  uppercase" dangerouslySetInnerHTML={{__html: faqContent.faqData?.faqContent?.title}}/>
        <div className="text-primary pt-4 text-sm text-center font-bold mb-6 sm:mb-10" dangerouslySetInnerHTML={{__html: faqContent.faqData?.faqContent?.subTitle}}/>
        <div className="px-4 pt-4 sm:pt-8">
          {
            faqContent.faqData?.faqDetailContent?.map((val, index) => (
              <div key={index} className="text-left border-b-2 border-default border-opacity-30" style={{
                borderBottom: "2px solid #615662"
              }}>
                <div
                     className="py-4 sm:py-6  w-full text-sm sm:text-lg font-bold text-left focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                  <SingleFaq
                    title={val.question}
                    content={val.answer}
                  />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default MainFaq;