import {GET_AUTH_FAIL, GET_AUTH_START, GET_AUTH_SUCCESS} from "redux/getAuth/actionTypes";
import api from "configs/axios";
import axios from "axios";

export const getAuthStart = () => {
  return {
    type: GET_AUTH_START
  };
};

export const getAuthSuccess = (userData) => {
  return {
    type: GET_AUTH_SUCCESS,
    payload: userData
  };
};

export const getAuthFail = (data) => {
  return {
    type: GET_AUTH_FAIL,
    payload: data
  };
};

export const getUserAuth = (accessToken) => {
  return async (dispatch) => {
    dispatch(getAuthStart());
    if (accessToken) {
      await axios.get("https://liber-t-admin.herokuapp.com/user/auth", {
        headers: {accessToken}
      }).then((res) => {
        dispatch(getAuthSuccess(res.data.data));
      }).catch((error) => {
        dispatch(getAuthFail(error));
      });
    } else {
      await api.get("user/auth").then((res) => {
        dispatch(getAuthSuccess(res.data.data));
      }).catch((error) => {
        dispatch(getAuthFail(error));
      });
    }
  };
};