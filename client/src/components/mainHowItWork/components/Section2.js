import React from "react";
import ArrowGif from "assets/gifs/arrow.gif";

export const Section2 = ({data}) => {
  return (
    <div className="main-how-part__1 d-flex flex-column justify-content-center align-items-center">
      <div className="part-1-header">
        <div className="middle">
          <div className="content" dangerouslySetInnerHTML={{__html: data?.description}}/>
        </div>
      </div>
      
      <div className="part-1-sections">
        <div className="section-item d-flex justify-content-start">
          <div className="section-item-container">
            <div className="top-arrow top-left-arrow">
              <img src={ArrowGif} alt="liberT" className="arrow-item"/>
            </div>
            <div className="section-item-number">
              <div className="number-container d-flex justify-content-center align-items-center">
                <div className="number">1</div>
              </div>
            </div>
            <div className="section-item-content d-flex align-items-center">
              <div className="content" dangerouslySetInnerHTML={{__html: data?.detail1}}/>
            </div>
            <div className="arrow-item">
              <img className="left-arrow" src={ArrowGif} alt="liberT"/>
            </div>
          </div>
        </div>
        
        <div className="section-item d-flex justify-content-end">
          <div className="section-item-container">
            <div className="top-arrow top-right-arrow">
              <img src={ArrowGif} alt="liberT" className="arrow-item"/>
            </div>
            <div className="section-item-number">
              <div className="number-container d-flex justify-content-center align-items-center">
                <div className="number">2</div>
              </div>
            </div>
            <div className="section-item-content d-flex align-items-center">
              <div className="content" dangerouslySetInnerHTML={{__html: data?.detail2}}/>
            </div>
            <div className="arrow-item">
              <img className="right-arrow" src={ArrowGif} alt="liberT"/>
            </div>
          </div>
        </div>
      </div>
      
      <div className="part-1-sections">
        <div className="section-item d-flex justify-content-start">
          <div className="section-item-container">
            <div className="section-item-number">
              <div className="number-container d-flex justify-content-center align-items-center">
                <div className="number">4</div>
              </div>
            </div>
            <div className="section-item-content d-flex align-items-center">
              <div className="content" dangerouslySetInnerHTML={{__html: data?.detail4}}/>
            </div>
          </div>
        </div>
        
        <div className="section-item d-flex justify-content-end">
          <div className="section-item-container">
            <div className="section-item-number">
              <div className="number-container d-flex justify-content-center align-items-center">
                <div className="number">3</div>
              </div>
            </div>
            <div className="section-item-content d-flex align-items-center">
              <div className="content" dangerouslySetInnerHTML={{__html: data?.detail3}}/>
            </div>
          </div>
        </div>
      </div>
      
      <div className="part-1-sections">
        <div className="section-item d-flex justify-content-center">
          <div className="section-item-container">
            <div className="bottom-arrow bottom-left-arrow">
              <img src={ArrowGif} alt="liberT" className="arrow-item"/>
            </div>
            <div className="section-item-number">
              <div className="number-container d-flex justify-content-center align-items-center">
                <div className="number">5</div>
              </div>
            </div>
            <div className="section-item-content d-flex align-items-center">
              <div className="content" dangerouslySetInnerHTML={{__html: data?.detail5}}/>
            </div>
            <div className="bottom-arrow bottom-right-arrow">
              <img src={ArrowGif} alt="liberT" className="arrow-item"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};