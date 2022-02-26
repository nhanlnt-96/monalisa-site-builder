import api from "configs/axios";
import {
  GET_FAQ_CONTENT_FAIL,
  GET_FAQ_CONTENT_START,
  GET_FAQ_CONTENT_SUCCESS
} from "redux/faqContent/actionTypes";

export const getFaqContentStart = () => {
  return {
    type: GET_FAQ_CONTENT_START
  };
};

export const getFaqContentSuccess = (roadmapData) => {
  return {
    type: GET_FAQ_CONTENT_SUCCESS,
    payload: roadmapData
  };
};

export const getFaqContentFail = (error) => {
  return {
    type: GET_FAQ_CONTENT_FAIL,
    payload: error
  };
};

export const getFaqContent = () => {
  return async (dispatch) => {
    dispatch(getFaqContentStart());
    await api.get("faq").then((res) => {
      dispatch(getFaqContentSuccess(res.data.data));
    }).catch((error) => {
      dispatch(getFaqContentFail(error.response.data.error));
    });
  };
};
