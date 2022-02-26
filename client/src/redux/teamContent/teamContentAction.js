import api from "configs/axios";
import {
  GET_TEAM_CONTENT_FAIL,
  GET_TEAM_CONTENT_START,
  GET_TEAM_CONTENT_SUCCESS
} from "redux/teamContent/actionTypes";

export const getTeamContentStart = () => {
  return {
    type: GET_TEAM_CONTENT_START
  };
};

export const getTeamContentSuccess = (teamData) => {
  return {
    type: GET_TEAM_CONTENT_SUCCESS,
    payload: teamData
  };
};

export const getTeamContentFail = (error) => {
  return {
    type: GET_TEAM_CONTENT_FAIL,
    payload: error
  };
};

export const getTeamContent = () => {
  return async (dispatch) => {
    dispatch(getTeamContentStart());
    await api.get("team").then((res) => {
      dispatch(getTeamContentSuccess(res.data.data));
    }).catch((error) => {
      dispatch(getTeamContentFail(error.response.data.error));
    });
  };
};
