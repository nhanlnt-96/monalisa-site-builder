import React, {useState} from "react";
import arrow from "assets/imgs/icons/arrow-down.svg";
import arrowUp from "assets/imgs/icons/arrow-up.svg";

export const SingleFaq = ({
                            title,
                            content
                          }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className="FrequentlyAsked__questions mb-4">
        <div
          className="FrequentlyAsked__question header-bg rounded flex justify-between cursor-pointer"
          onClick={() => setIsActive(!isActive)}
        >
          <div className="text-base md:text-xl font-bold text-default uppercase "
               dangerouslySetInnerHTML={{__html: title}}/>
          <span>
            <img src={isActive ? arrowUp : arrow} alt=""/>
          </span>
        </div>
        {isActive && (
          <div className="py-4 text-base font-light md:text-lg text-default"
               dangerouslySetInnerHTML={{__html: content}}/>
        )}
      </div>
    </>
  );
};