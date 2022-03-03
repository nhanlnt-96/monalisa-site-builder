import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSpecsContent} from "redux/specsContent/specsContentAction";
import LoadingComp from "components/loadingComp/LoadingComp";

const MainSpecs = () => {
  const dispatch = useDispatch();
  const specsContent = useSelector((state) => state.specsContent);
  useEffect(() => {
    dispatch(getSpecsContent());
  },[]);
  return specsContent.isLoading ? (
    <LoadingComp/>
  ) : (
    <section
      id="features"
      className=" bg-default mt-10 pt-10 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-0 text-center"
    >
      <div className="text-center text-xl text-primary font-semibold uppercase">
        The specs
      </div>
      <div className="grid grid-cols-12 sm:grid-cols-10 gap-3 align-top py-4 sm:py-12">
        {
          specsContent.specsData?.map((val, index) => (
            <div key={index}
                 className="border border-opacity-30 border-default items-center justify-center space-y-2 sm:space-y-6 px-4 sm:px-6 py-5 sm:py-10 hover:bg-secondary hover:text-default col-span-6 sm:col-span-2 text-default">
              {/* <h3 className='text-lg sm:text-2xl font-bold '></h3> */}
              <div className="hover:text-default font-normal text-xs sm:text-sm leading-relaxed text-gray"
                   dangerouslySetInnerHTML={{__html: val.content}}/>
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default MainSpecs;