import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {connect} from "redux/blockchain/blockchainActions";
import {fetchData} from "redux/data/dataActions";
import {getBannerContent} from "redux/bannerContent/bannerContentAction";
import LoadingComp from "components/loadingComp/LoadingComp";
import hero from 'assets/imgs/hero-image.png';

const MainBanner = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const bannerContent = useSelector((state) => state.bannerContent);
  const truncate = (input, len) =>
    input.length > len ? `${input.substring(0, len)}...` : input;
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });
  
  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    
    blockchain.smartContract.methods
      .mint(CONFIG.CONTRACT_ADDRESS, mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };
  
  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };
  
  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };
  
  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };
  
  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };
  
  const handleConnect = (e) => {
    e.preventDefault();
    dispatch(connect());
    getData();
  };
  
  useEffect(() => {
    getConfig();
    console.log(feedback);
  }, []);
  
  useEffect(() => {
    getData();
  }, [blockchain.account]);
  
  // useEffect(() => {
  //   dispatch(getBannerContent());
  // }, []);
  
  return bannerContent.isLoading ? (
    <LoadingComp/>
  ) : (
    <section className="relative w-full mx-auto herofull hero">
      <div className="h-full">
        <div className="device-layout-component">
          <div className="hero__bg">
            <div
              style={{
                display: "block",
                boxSizing: "border-box",
                paddingTop: "50%",
              }}
            />
            <img
              src={hero}
              alt="hero"
              className="hero__image max-w-full w-full"
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="relative">
          <div className="relative mx-auto mt-0 z-10">
            {/* <h1 className='text-center sm:text-2xl lg:text-5xl font-bold text-primary stroke-current bg-black p-6 lg:p-12 rounded-lg'>
              Pre-Mint for Whitelist users on 28th Dec 2021
            </h1>
            <div className='btn-gradient p-0.5 btn-animate w-56 mx-auto mt-5'>
              <a
                className='uppercase text-default font-bold text-sm tracking-wider h-14 px-8 flex justify-center items-center btn-bg-gradient focus:outline-none'
                href='https://docs.google.com/forms/d/e/1FAIpQLSdYzJJbgeYTxiCzvEO7xxHpK661ujKi9jSCWbzXN2fq4UKguA/viewform?usp=pp_url'
                target='_blank'
              >
                <span>Join Presale</span>
              </a>
            </div> */}
            <div className="relative text-center flex flex-col">
              <h3 className="font-bold text-default lg:text-4xl">
                {data.totalSupply} / {CONFIG.MAX_SUPPLY}
              </h3>
              <a
                target={"_blank"}
                href={CONFIG.SCAN_LINK}
                className="text-secondary font-bold lg:text-lg lg:py-3"
              >
                {" "}
                {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
              </a>
              +
              {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
                <>
                  <p className="font-bold text-default text-sm lg:text-base">
                    The sale has ended.
                  </p>
                  <p className="font-bold text-default text-sm lg:text-base">
                    You can still find {CONFIG.NFT_NAME} on
                  </p>
                  
                  <a target="_blank" href={CONFIG.MARKETPLACE_LINK}>
                    {CONFIG.MARKETPLACE}
                  </a>
                </>
              ) : (
                <>
                  <p className="text-default font-normal text-sm lg:text-base lg:py-3">
                    1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
                    {CONFIG.NETWORK.SYMBOL}. Excluding gas fees.
                  </p>
                  {blockchain.account === "" ||
                  blockchain.smartContract === null ? (
                    <>
                      {console.log(blockchain)}
                      <p className="text-default font-semibold text-xs lg:text-base">
                        Connect to the {CONFIG.NETWORK.NAME} network
                      </p>
                      
                      <div className="btn-gradient p-0.5 btn-animate w-56 mx-auto mt-5">
                        <a
                          className="uppercase text-default font-bold text-sm tracking-wider h-14 px-8 flex justify-center items-center btn-bg-gradient focus:outline-none"
                          href="#"
                          onClick={handleConnect}
                        >
                          <span>Connect</span>
                        </a>
                      </div>
                      {blockchain.errorMsg !== "" ? (
                        <>
                          <p className="text-danger py-2 font-bold">
                            {blockchain.errorMsg}
                          </p>
                        </>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <p className="font-medium text-default">{feedback}</p>
                      <>
                        <div className="buy__wrapper flex justify-center items-center gap-1 my-4">
                          <div className="btn-gradient p-0.5 btn-animate w-8 mx-auto ">
                            <a
                              className="uppercase text-default font-bold text-sm tracking-wider h-8 flex justify-center items-center btn-bg-gradient focus:outline-none"
                              href="#"
                              disabled={claimingNft ? 1 : 0}
                              onClick={(e) => {
                                e.preventDefault();
                                decrementMintAmount();
                              }}
                            >
                              <span className="text-xl">-</span>
                            </a>
                          </div>
                          
                          <p className="text-default font-bold text-xl border px-4 py-0.5 rounded-sm">
                            {mintAmount}
                          </p>
                          <div className="btn-gradient p-0.5 btn-animate w-8 mx-auto ">
                            <a
                              href="#"
                              className="uppercase text-default font-bold text-sm tracking-wider flex justify-center items-center btn-bg-gradient focus:outline-none"
                              disabled={claimingNft ? 1 : 0}
                              onClick={(e) => {
                                e.preventDefault();
                                incrementMintAmount();
                              }}
                            >
                              <span className="text-xl">+</span>
                            </a>
                          </div>
                        </div>
                      </>
                      <>
                        <button></button>
                        
                        <div className="btn-gradient p-0.5 btn-animate w-80 mx-auto mt-5">
                          <a
                            disabled={claimingNft ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              claimNFTs();
                              getData();
                            }}
                            className="uppercase text-default font-bold text-sm tracking-wider h-14 px-8 flex justify-center items-center btn-bg-gradient focus:outline-none"
                            href="#"
                          >
                            <span>{claimingNft ? "BUSY" : "BUY"}</span>
                          </a>
                        </div>
                      </>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;