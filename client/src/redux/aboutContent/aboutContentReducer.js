import {
  GET_ABOUT_CONTENT_FAIL,
  GET_ABOUT_CONTENT_START,
  GET_ABOUT_CONTENT_SUCCESS
} from "redux/aboutContent/actionTypes";

const initialState = {
  isLoading: false,
  aboutData: [],
  error: []
};

const aboutContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ABOUT_CONTENT_START:
      return {
        ...state,
        isLoading: true,
        error: []
      };
    case GET_ABOUT_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        aboutData: action.payload
      };
    case GET_ABOUT_CONTENT_FAIL:
      return {
        ...state,
        isLoading: false,
        aboutData: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default aboutContentReducer;