import {
  GET_BANNER_CONTENT_FAIL,
  GET_BANNER_CONTENT_START,
  GET_BANNER_CONTENT_SUCCESS
} from "redux/bannerContent/actionTypes";

const initialState = {
  isLoading: false,
  bannerData: [],
  error: []
};

const bannerContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BANNER_CONTENT_START:
      return {
        ...state,
        isLoading: true,
        error: []
      };
    case GET_BANNER_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bannerData: action.payload
      };
    case GET_BANNER_CONTENT_FAIL:
      return {
        ...state,
        isLoading: false,
        bannerData: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default bannerContentReducer;