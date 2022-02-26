import api from "configs/axios";
import {
  GET_ROADMAP_CONTENT_FAIL,
  GET_ROADMAP_CONTENT_START,
  GET_ROADMAP_CONTENT_SUCCESS
} from "redux/roadmapContent/actionTypes";

export const getRoadmapContentStart = () => {
  return {
    type: GET_ROADMAP_CONTENT_START
  };
};

export const getRoadmapContentSuccess = (roadmapData) => {
  return {
    type: GET_ROADMAP_CONTENT_SUCCESS,
    payload: roadmapData
  };
};

export const getRoadmapContentFail = (error) => {
  return {
    type: GET_ROADMAP_CONTENT_FAIL,
    payload: error
  };
};

export const getRoadmapContent = () => {
  return async (dispatch) => {
    dispatch(getRoadmapContentStart());
    await api.get("roadmap").then((res) => {
      dispatch(getRoadmapContentSuccess(res.data.data));
    }).catch((error) => {
      dispatch(getRoadmapContentFail(error.response.data.error));
    });
  };
};
