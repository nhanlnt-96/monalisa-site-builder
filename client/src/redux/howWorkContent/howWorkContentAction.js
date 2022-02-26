import api from "configs/axios";
import {
  GET_HOW_WORK_CONTENT_FAIL,
  GET_HOW_WORK_CONTENT_START,
  GET_HOW_WORK_CONTENT_SUCCESS
} from "redux/howWorkContent/actionTypes";

export const getHowWorkContentStart = () => {
  return {
    type: GET_HOW_WORK_CONTENT_START
  };
};

export const getHowWorkContentSuccess = (howWorkData) => {
  return {
    type: GET_HOW_WORK_CONTENT_SUCCESS,
    payload: howWorkData
  };
};

export const getHowWorkContentFail = (error) => {
  return {
    type: GET_HOW_WORK_CONTENT_FAIL,
    payload: error
  };
};

export const getHowWorkContent = () => {
  return async (dispatch) => {
    dispatch(getHowWorkContentStart());
    await api.get("how-work").then((res) => {
      dispatch(getHowWorkContentSuccess(res.data.data));
    }).catch((error) => {
      dispatch(getHowWorkContentFail(error.response.data.error));
    });
  };
};
