import {GET_AUTH_FAIL, GET_AUTH_START, GET_AUTH_SUCCESS} from "redux/getAuth/actionTypes";

const initialState = {
  isLoading: false,
  userData: [],
  error: []
};

const getAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_START:
      return {
        ...state,
        isLoading: true,
        error: []
      };
    case GET_AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: action.payload
      };
    case GET_AUTH_FAIL:
      return {
        ...state,
        isLoading: false,
        userData: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default getAuthReducer;