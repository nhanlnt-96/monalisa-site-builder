import {LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS} from "./actionTypes";

const initialState = {
  isLoading: false,
  isLogged: false,
  errorMsg: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLoading: true,
        errorMsg: ""
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLogged: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isLogged: false,
        errorMsg: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;