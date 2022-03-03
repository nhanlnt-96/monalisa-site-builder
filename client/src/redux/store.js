import {applyMiddleware, compose, createStore, combineReducers} from "redux";
import thunk from "redux-thunk";
import blockchainReducer from "./blockchain/blockchainReducer";
import dataReducer from "./data/dataReducer";
import authReducer from "./auth/authReducer";
import getAuthReducer from "redux/getAuth/getAuthReducer";
import bannerContentReducer from "redux/bannerContent/bannerContentReducer";
import finishUpdateReducer from "redux/finishUpdate/finishUpdateReducer";
import aboutContentReducer from "redux/aboutContent/aboutContentReducer";
import roadmapContentReducer from "redux/roadmapContent/roadmapContentReducer";
import faqContentReducer from "redux/faqContent/faqContentReducer";
import teamContentReducer from "redux/teamContent/teamContentReducer";
import collectionsContentReducer from "redux/collectionsContent/collectionsContentReducer";
import uploadMultiImgReducer from "redux/uploadMultiImg/uploadMultiImgReducer";
import spotContentReducer from "redux/spotContent/spotContentReducer";
import specsContentReducer from "redux/specsContent/specsContentReducer";
import dropsContentReducer from "redux/dropsContent/dropsContentReducer";

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  data: dataReducer,
  auth: authReducer,
  getAuth: getAuthReducer,
  bannerContent: bannerContentReducer,
  finishUpdate: finishUpdateReducer,
  aboutContent: aboutContentReducer,
  roadmapContent: roadmapContentReducer,
  faqContent: faqContentReducer,
  teamContent: teamContentReducer,
  collectionsContent: collectionsContentReducer,
  uploadedImgsData: uploadMultiImgReducer,
  spotContent: spotContentReducer,
  specsContent: specsContentReducer,
  dropsContent:dropsContentReducer
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;
