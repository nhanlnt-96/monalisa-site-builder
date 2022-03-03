import React, {useEffect} from "react";
import {Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getFaqContent} from "redux/faqContent/faqContentAction";
import LoadingComp from "components/loadingComp/LoadingComp";
import {SingleFaq} from "components/mainFaq/components/SingleFaq";

const MainFaq = () => {
  const faqContent = {
    isLoading: false
  };
  // const dispatch = useDispatch();
  // const faqContent = useSelector((state) => state.faqContent);
  // useEffect(() => {
  //   dispatch(getFaqContent());
  // }, []);
  return faqContent.isLoading ? (
    <LoadingComp/>
  ) : (
    <section className='mt-10 sm:mt-8' id='faq'>
      <div className='max-w-7xl mx-auto px-4 sm:mt-24 sm:px-0 lg:mt-4 text-center'>
        <h2 className='text-primary sm:text-center text-xl sm:text-4xl tracking-wide leading-normal font-bold mb-6 sm:mb-10 uppercase'>
          Frequently Asked Questions
          <p className='pt-4 text-sm text-center'>
            PRICE : 0.04 ETH for Pre-Mint (Whitelisted users) - 0.05 ETH
            General Mint
          </p>
        </h2>
        <div className='px-4 pt-4 sm:pt-8'>
          <div className='text-left border-b-2 border-default border-opacity-30'>
            <div className='py-4 sm:py-6  w-full text-sm sm:text-lg font-bold text-left focus:outline-none focus-visible:ring focus-visible:ring-opacity-75'>
              <SingleFaq
                title='Why Monalisaverse?'
                content='because we are the first Italian (and international) NFT
                  project about a masterpiece such as the Mona Lisa; our
                  Roadmap explains our goals, and we have big plans for the
                  future'
              />
            </div>
          </div>
          <div className='text-left border-b-2 border-default border-opacity-30'>
            <div className='py-4 sm:py-6  w-full text-sm sm:text-lg font-bold text-left focus:outline-none focus-visible:ring focus-visible:ring-opacity-75'>
              <SingleFaq
                title='Why ETH network?'
                content='it’s not the cheapest, surely, but it’s the safest and most
                transparent for transactions.'
              />
            </div>
          </div>
        
          <div className='text-left border-b-2 border-default border-opacity-30'>
            <div className='py-4 sm:py-6  w-full text-sm sm:text-lg font-bold text-left focus:outline-none focus-visible:ring focus-visible:ring-opacity-75'>
              <SingleFaq
                title='Where will I see my NFTs?'
                content='on your OpenSea connected with your wallet. You can also see
                it on Metamask, in the NFTs section, ETH main network.'
              />
            </div>
          </div>
          <div className='text-left border-b-2 border-default border-opacity-30'>
            <div className='py-4 sm:py-6 w-full text-sm sm:text-lg font-bold text-left focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 '>
              <SingleFaq
                title='When will I get my NFTs revealed?'
                content=' the ones of the First drop (whitelisted and non whitelisted)
                will ne all revealed on 25th Dec at 00:00AM CET (Midnight,
                Italy time) 🎁'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainFaq;