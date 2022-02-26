import {
  GET_BANNER_CONTENT_FAIL,
  GET_BANNER_CONTENT_START,
  GET_BANNER_CONTENT_SUCCESS
} from "redux/bannerContent/actionTypes";
import api from "configs/axios";

export const getBannerContentStart = () => {
  return {
    type: GET_BANNER_CONTENT_START
  };
};

export const getBannerContentSuccess = (bannerData) => {
  return {
    type: GET_BANNER_CONTENT_SUCCESS,
    payload: bannerData
  };
};

export const getBannerContentFail = (error) => {
  return {
    type: GET_BANNER_CONTENT_FAIL,
    payload: error
  };
};

export const getBannerContent = () => {
  return async (dispatch) => {
    dispatch(getBannerContentStart());
    await api.get("banner").then((res) => {
      dispatch(getBannerContentSuccess(res.data.data[0]));
    }).catch((error) => {
      dispatch(getBannerContentFail(error.response.data.error));
    });
  };
};