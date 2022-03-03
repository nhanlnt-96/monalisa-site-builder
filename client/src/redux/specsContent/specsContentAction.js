import {
  GET_SPECS_CONTENT_FAIL,
  GET_SPECS_CONTENT_START,
  GET_SPECS_CONTENT_SUCCESS
} from "redux/specsContent/actionTypes";
import api from "configs/axios";

export const getSpecsContentStart = () => {
  return {
    type: GET_SPECS_CONTENT_START
  };
};

export const getSpecsContentSuccess = (bannerData) => {
  return {
    type: GET_SPECS_CONTENT_SUCCESS,
    payload: bannerData
  };
};

export const getSpecsContentFail = (error) => {
  return {
    type: GET_SPECS_CONTENT_FAIL,
    payload: error
  };
};

export const getSpecsContent = () => {
  return async (dispatch) => {
    dispatch(getSpecsContentStart());
    await api.get("specs").then((res) => {
      dispatch(getSpecsContentSuccess(res.data.data));
    }).catch((error) => {
      dispatch(getSpecsContentFail(error.response.data.error));
    });
  };
};