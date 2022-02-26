import api from "configs/axios";
import {
  GET_ABOUT_CONTENT_FAIL,
  GET_ABOUT_CONTENT_START,
  GET_ABOUT_CONTENT_SUCCESS
} from "redux/aboutContent/actionTypes";

export const getAboutContentStart = () => {
  return {
    type: GET_ABOUT_CONTENT_START
  };
};

export const getAboutContentSuccess = (aboutData) => {
  return {
    type: GET_ABOUT_CONTENT_SUCCESS,
    payload: aboutData
  };
};

export const getAboutContentFail = (error) => {
  return {
    type: GET_ABOUT_CONTENT_FAIL,
    payload: error
  };
};

export const getAboutContent = () => {
  return async (dispatch) => {
    dispatch(getAboutContentStart());
    await api.get("about").then((res) => {
      dispatch(getAboutContentSuccess(res.data.data[0]));
    }).catch((error) => {
      dispatch(getAboutContentFail(error.response.data.error));
    });
  };
};
