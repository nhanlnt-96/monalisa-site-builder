import {
  GET_SPECS_CONTENT_FAIL,
  GET_SPECS_CONTENT_START,
  GET_SPECS_CONTENT_SUCCESS
} from "redux/specsContent/actionTypes";

const initialState = {
  isLoading: false,
  specsData: [],
  error: []
};

const specsContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPECS_CONTENT_START:
      return {
        ...state,
        isLoading: true,
        error: []
      };
    case GET_SPECS_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        specsData: action.payload
      };
    case GET_SPECS_CONTENT_FAIL:
      return {
        ...state,
        isLoading: false,
        specsData: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default specsContentReducer;