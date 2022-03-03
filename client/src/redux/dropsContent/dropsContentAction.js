import {
  GET_DROPS_CONTENT_FAIL,
  GET_DROPS_CONTENT_START,
  GET_DROPS_CONTENT_SUCCESS
} from "redux/dropsContent/actionTypes";
import api from "configs/axios";

export const getDropsContentStart = () => {
  return {
    type: GET_DROPS_CONTENT_START
  };
};

export const getDropsContentSuccess = (dropsData) => {
  return {
    type: GET_DROPS_CONTENT_SUCCESS,
    payload: dropsData
  };
};

export const getDropsContentFail = (error) => {
  return {
    type: GET_DROPS_CONTENT_FAIL,
    payload: error
  };
};

export const getDropsContent = () => {
  return async (dispatch) => {
    dispatch(getDropsContentStart());
    await api.get("drops").then((res) => {
      dispatch(getDropsContentSuccess(res.data.data));
    }).catch((error) => {
      dispatch(getDropsContentFail(error.response.data.error));
    });
  };
};