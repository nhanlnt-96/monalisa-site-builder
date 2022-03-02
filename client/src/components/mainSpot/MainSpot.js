import React from "react";
import spot1 from "assets/imgs/spot/spot1.jpg";
import spot2 from "assets/imgs/spot/spot2.png";
import spot3 from "assets/imgs/spot/spot3.png";

const MainSpot = () => {
  return (
    <section className="mt-10 sm:mt-auto py-6 sm:py-20 text-center">
      <h2 className="text-primary uppercase text-lg font-semibold mb-6">
        Get Your Spot now
      </h2>
      <div className="mt-0 mx-auto max-w-7xl px-4 sm:mt-0 sm:px-0 pb-10 sm:pb-14 text-center">
        <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-4">
          <div className="spot__image">
            <img src={spot1} alt="" className="max-w-full"/>
            <p className="text-sm font-bold py-4 px-2 text-left text-default">
              The Original Monalisa : 1/1, at auction after the Three Drops
            </p>
          </div>
          <div className="spot__image">
            <img src={spot2} alt="" className="max-w-full"/>
            <p className="text-sm font-bold py-4 px-2 text-left text-default">
              'Driver' Monalisa : The unique NFT that will give you a Tesla
              Model S
            </p>
          </div>
          
          <div className="spot__image">
            <img src={spot3} alt="" className="max-w-full"/>
            <p className="text-sm font-bold py-4 px-2 text-left text-default">
              'Golden Ticket' Monalisa : In each drop, it's different and
              gives you free Monalisa!
            </p>
          </div>
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