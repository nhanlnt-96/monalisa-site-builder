import {LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS} from "./actionTypes";
import api from "configs/axios";
import {getUserAuth} from "redux/getAuth/getAuthAction";

export const loginStart = () => {
  return {
    type: LOGIN_START
  };
};

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};

export const loginFail = (data) => {
  return {
    type: LOGIN_FAIL,
    payload: data
  };
};

export const login = (data, history) => {
  return async (dispatch) => {
    dispatch(loginStart());
    await api.post("user/login", {
      username: data.username,
      password: data.password
    }).then((res) => {
      localStorage.setItem("accessToken", res.data.data.accessToken);
      dispatch(loginSuccess());
      dispatch(getUserAuth(res.data.data.accessToken));
      history("/admin");
    }).catch(error => {
      dispatch(loginFail(error.response.data.error));
    });
  };
};