import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSpecsContent} from "redux/specsContent/specsContentAction";
import {getDropsContent} from "redux/dropsContent/dropsContentAction";

const MainDrops = () => {
  const dispatch = useDispatch();
  const dropsContent = useSelector((state) => state.dropsContent);
  useEffect(() => {
    dispatch(getDropsContent());
  }, []);
  return (
    <section className="py-12 " id="drops">
      <div className=" px-4 2xl:px-72 mx-auto md:px-12">
        <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
          <h2 className="text-primary sm:text-center text-2xl sm:text-4xl tracking-wide leading-normal font-bold mb-6 sm:mb-10 uppercase">
            drops
          </h2>
        </div>
        <div className="golden__ticket__wrapper grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {
            dropsContent.dropsData?.map((val, index) => (
              <div
                key={index}
                className="golden__card bg-secondary px-8 py-4 rounded-xl relative "
                data-aos="zoom-in"
                data-aos-duration="1000"
              >
                <div className="golden__card__inner">
                  <div className="text-default text-center font-bold font-body text-2xl 2xl:text-4xl leading-10 mb-2 "
                       dangerouslySetInnerHTML={{__html: val.title}}/>
                  <div className="text-sm text-left text-default lg:font-medium"
                       dangerouslySetInnerHTML={{__html: val.content}}/>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default MainDrops;