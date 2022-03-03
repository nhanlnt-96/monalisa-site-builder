import api from "configs/axios";
import {
  GET_SPOT_CONTENT_FAIL,
  GET_SPOT_CONTENT_START,
  GET_SPOT_CONTENT_SUCCESS
} from "redux/spotContent/actionTypes";

export const getSpotContentStart = () => {
  return {
    type: GET_SPOT_CONTENT_START
  };
};

export const getSpotContentSuccess = (spotData) => {
  return {
    type: GET_SPOT_CONTENT_SUCCESS,
    payload: spotData
  };
};

export const getSpotContentFail = (error) => {
  return {
    type: GET_SPOT_CONTENT_FAIL,
    payload: error
  };
};

export const getSpotContent = () => {
  return async (dispatch) => {
    dispatch(getSpotContentStart());
    await api.get("spot").then((res) => {
      dispatch(getSpotContentSuccess(res.data.data));
    }).catch((error) => {
      dispatch(getSpotContentFail(error.response.data.error));
    });
  };
};
